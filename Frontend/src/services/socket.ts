import { API_BASE_URL } from "../config";

export interface RealtimeUser {
  id?: number | string | null;
  name: string;
  email?: string;
  isHost?: boolean;
}

export interface RealtimeMessage {
  id: string;
  roomCode: string;
  sender: RealtimeUser;
  text: string;
  type: "chat" | "system" | "reaction";
  timestamp: string;
}

type EventCallback = (data: any) => void;

class ArenaRealtimeClient {
  private eventSource: EventSource | null = null;
  private broadcastChannel: BroadcastChannel | null = null;
  private listeners: Map<string, Set<EventCallback>> = new Map();
  public connected: boolean = false;
  private currentRoomCode: string | null = null;
  private currentUser: RealtimeUser | null = null;
  private reconnectTimer: any = null;

  constructor() {
    this.setupStorageFallback();
  }

  private setupStorageFallback() {
    // Cross-tab broadcast via BroadcastChannel & Storage Event
    if (typeof window !== "undefined") {
      try {
        this.broadcastChannel = new BroadcastChannel("questai_arena_realtime");
        this.broadcastChannel.onmessage = (event) => {
          const { roomCode, eventType, data } = event.data || {};
          if (roomCode && this.currentRoomCode && roomCode.toUpperCase() === this.currentRoomCode.toUpperCase()) {
            this.dispatchLocal(eventType, data);
          }
        };
      } catch {
        // Fallback for environments without BroadcastChannel
        window.addEventListener("storage", (e) => {
          if (e.key === "questai_arena_sync" && e.newValue) {
            try {
              const { roomCode, eventType, data } = JSON.parse(e.newValue);
              if (roomCode && this.currentRoomCode && roomCode.toUpperCase() === this.currentRoomCode.toUpperCase()) {
                this.dispatchLocal(eventType, data);
              }
            } catch {
              // Ignore JSON parse error
            }
          }
        });
      }
    }
  }

  private broadcastCrossTab(eventType: string, data: any) {
    if (!this.currentRoomCode) return;
    const payload = { roomCode: this.currentRoomCode, eventType, data, ts: Date.now() };

    if (this.broadcastChannel) {
      try {
        this.broadcastChannel.postMessage(payload);
      } catch (e) {
        console.warn("BroadcastChannel error:", e);
      }
    }

    try {
      localStorage.setItem("questai_arena_sync", JSON.stringify(payload));
    } catch {
      // Ignore quota errors
    }
  }

  public connectToRoom(roomCode: string, user?: RealtimeUser) {
    const code = (roomCode || "").toUpperCase();
    if (!code) return;

    if (this.currentRoomCode === code && this.eventSource && this.connected) {
      return;
    }

    this.disconnect();
    this.currentRoomCode = code;
    this.currentUser = user || { name: "Player", email: "" };

    const queryParams = new URLSearchParams({
      roomCode: code,
      userName: this.currentUser.name || "Player",
      userEmail: this.currentUser.email || "",
      userId: this.currentUser.id ? String(this.currentUser.id) : "",
    });

    const streamUrl = `${API_BASE_URL}/Arena/stream/${code}?${queryParams.toString()}`;

    try {
      this.eventSource = new EventSource(streamUrl);

      this.eventSource.onopen = () => {
        this.connected = true;
        this.dispatchLocal("connect", { id: "sse_" + Date.now() });
        console.log(`[Arena Stream] Live SSE connection opened for room ${code}`);
      };

      this.eventSource.onerror = (err) => {
        console.warn("[Arena Stream] SSE connection error, scheduling reconnect...", err);
        this.connected = false;
        this.dispatchLocal("disconnect", "error");
        this.eventSource?.close();
        this.eventSource = null;

        if (!this.reconnectTimer) {
          this.reconnectTimer = setTimeout(() => {
            this.reconnectTimer = null;
            if (this.currentRoomCode) {
              this.connectToRoom(this.currentRoomCode, this.currentUser || undefined);
            }
          }, 3000);
        }
      };

      // Listen for custom SSE events
      this.eventSource.addEventListener("init_messages", (event: MessageEvent) => {
        try {
          const messages = JSON.parse(event.data);
          this.dispatchLocal("init_messages", messages);
        } catch (e) {
          console.error("Error parsing init_messages:", e);
        }
      });

      this.eventSource.addEventListener("receive_message", (event: MessageEvent) => {
        try {
          const msg = JSON.parse(event.data);
          this.dispatchLocal("receive_message", msg);
        } catch (e) {
          console.error("Error parsing receive_message:", e);
        }
      });

      this.eventSource.addEventListener("room_users_updated", (event: MessageEvent) => {
        try {
          const users = JSON.parse(event.data);
          this.dispatchLocal("room_users_updated", users);
        } catch (e) {
          console.error("Error parsing room_users_updated:", e);
        }
      });

      this.eventSource.addEventListener("user_typing", (event: MessageEvent) => {
        try {
          const typingData = JSON.parse(event.data);
          this.dispatchLocal("user_typing", typingData);
        } catch (e) {
          console.error("Error parsing user_typing:", e);
        }
      });

      this.eventSource.addEventListener("battle_started", (event: MessageEvent) => {
        try {
          const battleData = JSON.parse(event.data);
          this.dispatchLocal("battle_started", battleData);
        } catch (e) {
          console.error("Error parsing battle_started:", e);
        }
      });
    } catch (err) {
      console.error("Failed to initialize SSE EventSource:", err);
    }
  }

  public disconnect() {
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
    if (this.eventSource) {
      this.eventSource.close();
      this.eventSource = null;
    }
    this.connected = false;
  }

  public on(eventType: string, callback: EventCallback) {
    if (!this.listeners.has(eventType)) {
      this.listeners.set(eventType, new Set());
    }
    this.listeners.get(eventType)?.add(callback);
  }

  public off(eventType: string, callback: EventCallback) {
    this.listeners.get(eventType)?.delete(callback);
  }

  public dispatchLocal(eventType: string, data: any) {
    const callbacks = this.listeners.get(eventType);
    if (callbacks) {
      callbacks.forEach((cb) => {
        try {
          cb(data);
        } catch (err) {
          console.error(`Error in event listener for ${eventType}:`, err);
        }
      });
    }
  }

  public async emit(eventType: string, payload: any) {
    if (eventType === "join_room") {
      const { roomCode, user } = payload || {};
      this.connectToRoom(roomCode, user);
      return;
    }

    if (eventType === "leave_room") {
      this.disconnect();
      return;
    }

    if (eventType === "send_message") {
      const { roomCode, text, user, type } = payload || {};
      const targetRoom = (roomCode || this.currentRoomCode || "").toUpperCase();
      if (!targetRoom || !text?.trim()) return;

      const newMsg: RealtimeMessage = {
        id: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        roomCode: targetRoom,
        sender: user || this.currentUser || { name: "Player" },
        text: text.trim(),
        type: type || "chat",
        timestamp: new Date().toISOString(),
      };

      // Optimistically dispatch locally
      this.dispatchLocal("receive_message", newMsg);

      // Post to backend server with the same message id
      try {
        await fetch(`${API_BASE_URL}/Arena/messages`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: newMsg.id,
            roomCode: targetRoom,
            text: text.trim(),
            userName: newMsg.sender.name,
            userEmail: newMsg.sender.email,
            type: newMsg.type,
          }),
        });
      } catch (err) {
        console.warn("Failed to post message to backend:", err);
      }
      return;
    }

    if (eventType === "typing") {
      const { roomCode, user, isTyping } = payload || {};
      const targetRoom = (roomCode || this.currentRoomCode || "").toUpperCase();
      if (!targetRoom) return;

      const typingData = {
        user: user || this.currentUser || { name: "Player" },
        isTyping: Boolean(isTyping),
      };

      this.broadcastCrossTab("user_typing", typingData);

      try {
        await fetch(`${API_BASE_URL}/Arena/typing`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            roomCode: targetRoom,
            userName: typingData.user.name,
            isTyping: typingData.isTyping,
          }),
        });
      } catch {
        // Ignore
      }
      return;
    }

    if (eventType === "start_battle") {
      const { roomCode, slug } = payload || {};
      const targetRoom = (roomCode || this.currentRoomCode || "").toUpperCase();
      if (!targetRoom) return;

      const battleData = { roomCode: targetRoom, slug: slug || "two-sum" };
      this.dispatchLocal("battle_started", battleData);
      this.broadcastCrossTab("battle_started", battleData);

      try {
        await fetch(`${API_BASE_URL}/Arena/start`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(battleData),
        });
      } catch (err) {
        console.warn("Failed to notify backend of battle start:", err);
      }
      return;
    }
  }
}

const clientInstance = new ArenaRealtimeClient();

export function getSocket() {
  return clientInstance;
}

export function disconnectSocket(): void {
  clientInstance.disconnect();
}
