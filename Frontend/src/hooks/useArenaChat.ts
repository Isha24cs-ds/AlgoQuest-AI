import { useState, useEffect, useCallback, useRef } from "react";
import { getSocket } from "../services/socket";
import { API_BASE_URL } from "../config";
import { useAuth } from "../context/AuthContext";

export interface ChatSender {
  id?: number | string | null;
  name: string;
  email?: string;
  isHost?: boolean;
  isSystem?: boolean;
}

export interface ChatMessage {
  id: string;
  roomCode: string;
  sender: ChatSender;
  text: string;
  type: "chat" | "system" | "reaction";
  timestamp: string;
}

export interface ActiveUser {
  id?: number | string;
  name: string;
  email?: string;
}

export function useArenaChat(roomCode?: string | null) {
  const { user } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [activeUsers, setActiveUsers] = useState<ActiveUser[]>([]);
  const [typingUsers, setTypingUsers] = useState<string[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  const activeRoomCode = (roomCode || "").toUpperCase();
  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isTypingRef = useRef(false);

  // Fetch initial messages via REST as fast fallback
  const fetchMessagesFromApi = useCallback(async (code: string) => {
    if (!code) return;
    try {
      const res = await fetch(`${API_BASE_URL}/Arena/messages/${code}`);
      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.messages)) {
          setMessages((prev) => {
            const existingIds = new Set(prev.map((m) => m.id));
            const newOnes = data.messages.filter((m: ChatMessage) => !existingIds.has(m.id));
            return [...prev, ...newOnes];
          });
        }
      }
    } catch (err) {
      console.warn("Failed to fetch arena messages via REST:", err);
    }
  }, []);

  useEffect(() => {
    if (!activeRoomCode) return;

    fetchMessagesFromApi(activeRoomCode);

    const socket = getSocket();
    setIsConnected(socket.connected);

    const currentUserData = {
      id: user?.id || null,
      name: user?.name || "Player",
      email: user?.email || "",
    };

    // Join the room
    socket.emit("join_room", {
      roomCode: activeRoomCode,
      user: currentUserData,
    });

    function handleConnect() {
      setIsConnected(true);
      socket.emit("join_room", {
        roomCode: activeRoomCode,
        user: currentUserData,
      });
    }

    function handleDisconnect() {
      setIsConnected(false);
    }

    function handleInitMessages(history: ChatMessage[]) {
      if (Array.isArray(history)) {
        setMessages((prev) => {
          const map = new Map<string, ChatMessage>();
          [...history, ...prev].forEach((m) => map.set(m.id, m));
          return Array.from(map.values()).sort(
            (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
          );
        });
      }
    }

    function handleReceiveMessage(msg: ChatMessage) {
      if (!msg || !msg.text) return;
      setMessages((prev) => {
        // 1. Exact ID match
        if (prev.some((m) => m.id === msg.id)) return prev;

        // 2. Content & sender match within 3 seconds (replaces optimistic copy)
        const dupIndex = prev.findIndex(
          (m) =>
            m.text === msg.text &&
            m.sender?.name === msg.sender?.name &&
            Math.abs(new Date(m.timestamp).getTime() - new Date(msg.timestamp).getTime()) < 3000
        );

        if (dupIndex !== -1) {
          const updated = [...prev];
          updated[dupIndex] = msg;
          return updated;
        }

        return [...prev, msg];
      });
      setUnreadCount((c) => c + 1);
    }

    function handleRoomUsersUpdated(users: ActiveUser[]) {
      if (Array.isArray(users)) {
        setActiveUsers(users);
      }
    }

    function handleUserTyping({ user: typingUser, isTyping }: { user: { name: string }; isTyping: boolean }) {
      if (!typingUser?.name || typingUser.name === (user?.name || "Player")) return;
      setTypingUsers((prev) => {
        if (isTyping) {
          return prev.includes(typingUser.name) ? prev : [...prev, typingUser.name];
        } else {
          return prev.filter((name) => name !== typingUser.name);
        }
      });
    }

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    socket.on("init_messages", handleInitMessages);
    socket.on("receive_message", handleReceiveMessage);
    socket.on("room_users_updated", handleRoomUsersUpdated);
    socket.on("user_typing", handleUserTyping);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off("init_messages", handleInitMessages);
      socket.off("receive_message", handleReceiveMessage);
      socket.off("room_users_updated", handleRoomUsersUpdated);
      socket.off("user_typing", handleUserTyping);
      socket.emit("leave_room", { roomCode: activeRoomCode });
    };
  }, [activeRoomCode, user, fetchMessagesFromApi]);

  const sendMessage = useCallback(
    async (text: string, type: "chat" | "reaction" = "chat") => {
      if (!text.trim() || !activeRoomCode) return;

      const socket = getSocket();
      const currentUserData = {
        id: user?.id || null,
        name: user?.name || "Player",
        email: user?.email || "",
      };

      // Reset typing state
      if (isTypingRef.current) {
        isTypingRef.current = false;
        socket.emit("typing", {
          roomCode: activeRoomCode,
          user: currentUserData,
          isTyping: false,
        });
      }

      // Emit via socket (which handles optimistic update, cross-tab sync, and server POST)
      socket.emit("send_message", {
        roomCode: activeRoomCode,
        text: text.trim(),
        user: currentUserData,
        type,
      });
    },
    [activeRoomCode, user]
  );

  const sendTyping = useCallback(
    (isTyping: boolean) => {
      if (!activeRoomCode) return;
      const socket = getSocket();
      const currentUserData = {
        id: user?.id || null,
        name: user?.name || "Player",
        email: user?.email || "",
      };

      if (isTyping) {
        if (!isTypingRef.current) {
          isTypingRef.current = true;
          socket.emit("typing", {
            roomCode: activeRoomCode,
            user: currentUserData,
            isTyping: true,
          });
        }

        if (typingTimeoutRef.current) {
          clearTimeout(typingTimeoutRef.current);
        }

        typingTimeoutRef.current = setTimeout(() => {
          isTypingRef.current = false;
          socket.emit("typing", {
            roomCode: activeRoomCode,
            user: currentUserData,
            isTyping: false,
          });
        }, 2000);
      } else {
        isTypingRef.current = false;
        if (typingTimeoutRef.current) {
          clearTimeout(typingTimeoutRef.current);
        }
        socket.emit("typing", {
          roomCode: activeRoomCode,
          user: currentUserData,
          isTyping: false,
        });
      }
    },
    [activeRoomCode, user]
  );

  const startBattleBroadcast = useCallback(
    (slug = "two-sum") => {
      if (!activeRoomCode) return;
      const socket = getSocket();
      socket.emit("start_battle", {
        roomCode: activeRoomCode,
        slug,
      });
    },
    [activeRoomCode]
  );

  const clearUnread = useCallback(() => {
    setUnreadCount(0);
  }, []);

  return {
    messages,
    activeUsers,
    typingUsers,
    isConnected,
    unreadCount,
    sendMessage,
    sendTyping,
    startBattleBroadcast,
    clearUnread,
  };
}
