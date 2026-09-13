// In-memory store for room message history: roomCode -> Array<Message>
const roomMessages = new Map();

// In-memory store for active SSE subscribers: roomCode -> Set<Response>
const roomSubscribers = new Map();

// In-memory store for active users per room: roomCode -> Map<subscriberId, User>
const roomActiveUsers = new Map();

export function getRoomMessages(roomCode) {
  const code = (roomCode || "").toUpperCase();
  return roomMessages.get(code) || [];
}

export function getRoomUsers(roomCode) {
  const code = (roomCode || "").toUpperCase();
  const userMap = roomActiveUsers.get(code);
  if (!userMap) return [];
  return Array.from(userMap.values());
}

export function addRoomMessage(roomCode, message) {
  const code = (roomCode || "").toUpperCase();
  if (!roomMessages.has(code)) {
    roomMessages.set(code, []);
  }
  const messages = roomMessages.get(code);

  // 1. If message already exists by ID, return existing
  if (message.id) {
    const existingById = messages.find((m) => m.id === message.id);
    if (existingById) return existingById;
  }

  // 2. Prevent duplicate rapid message (< 1.5s same sender & text)
  const existingByContent = messages.find(
    (m) =>
      m.text === message.text &&
      m.sender?.name === (message.sender?.name || "Player") &&
      Math.abs(new Date(m.timestamp).getTime() - Date.now()) < 1500
  );
  if (existingByContent) return existingByContent;

  const msgObj = {
    id: message.id || `msg_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
    roomCode: code,
    sender: message.sender || { name: "Player", email: "" },
    text: message.text || "",
    type: message.type || "chat", // "chat", "system", "reaction"
    timestamp: message.timestamp || new Date().toISOString(),
  };

  messages.push(msgObj);
  // Keep last 250 messages per room
  if (messages.length > 250) {
    messages.shift();
  }

  // Broadcast to all active subscribers in room
  broadcastToRoom(code, "receive_message", msgObj);

  return msgObj;
}

export function broadcastToRoom(roomCode, eventType, data) {
  const code = (roomCode || "").toUpperCase();
  const subscribers = roomSubscribers.get(code);
  if (!subscribers || subscribers.size === 0) return;

  const payload = `event: ${eventType}\ndata: ${JSON.stringify(data)}\n\n`;

  for (const client of subscribers) {
    try {
      client.write(payload);
    } catch (err) {
      console.warn(`Failed to send event to client in room ${code}:`, err.message);
      subscribers.delete(client);
    }
  }
}

export function handleRoomSSEStream(req, res) {
  const roomCode = (req.params.roomCode || req.query.roomCode || "").toUpperCase();
  if (!roomCode) {
    return res.status(400).json({ success: false, message: "Room code required" });
  }

  const userName = req.query.userName || req.user?.name || "Player";
  const userEmail = req.query.userEmail || req.user?.email || "";
  const userId = req.user?.id || req.query.userId || null;
  const subscriberId = `${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

  // Set SSE Headers
  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache, no-transform",
    "Connection": "keep-alive",
    "Access-Control-Allow-Origin": "*",
    "X-Accel-Buffering": "no",
  });

  // Keep connection alive with heartbeat ping
  const heartbeat = setInterval(() => {
    try {
      res.write(": ping\n\n");
    } catch (e) {
      clearInterval(heartbeat);
    }
  }, 20000);

  // Register subscriber
  if (!roomSubscribers.has(roomCode)) {
    roomSubscribers.set(roomCode, new Set());
  }
  roomSubscribers.get(roomCode).add(res);

  // Register active user
  if (!roomActiveUsers.has(roomCode)) {
    roomActiveUsers.set(roomCode, new Map());
  }
  const userObj = { id: userId, name: userName, email: userEmail, subscriberId };
  roomActiveUsers.get(roomCode).set(subscriberId, userObj);

  // Send initial room state (messages & active users)
  const initialMessages = getRoomMessages(roomCode);
  const activeUsers = getRoomUsers(roomCode);

  res.write(`event: init_messages\ndata: ${JSON.stringify(initialMessages)}\n\n`);
  res.write(`event: room_users_updated\ndata: ${JSON.stringify(activeUsers)}\n\n`);

  // Broadcast updated user roster
  broadcastToRoom(roomCode, "room_users_updated", activeUsers);

  console.log(`[Arena SSE] User ${userName} subscribed to room ${roomCode}`);

  req.on("close", () => {
    clearInterval(heartbeat);
    const subscribers = roomSubscribers.get(roomCode);
    if (subscribers) {
      subscribers.delete(res);
      if (subscribers.size === 0) {
        roomSubscribers.delete(roomCode);
      }
    }

    const usersMap = roomActiveUsers.get(roomCode);
    if (usersMap) {
      usersMap.delete(subscriberId);
      broadcastToRoom(roomCode, "room_users_updated", Array.from(usersMap.values()));
    }
    console.log(`[Arena SSE] User ${userName} disconnected from room ${roomCode}`);
  });
}

export function broadcastBattleStart(roomCode, slug = "two-sum") {
  const code = (roomCode || "").toUpperCase();
  const systemMsg = addRoomMessage(code, {
    sender: { name: "Arena Master", isSystem: true },
    text: "⚔️ The battle has begun! Good luck to all competitors.",
    type: "system",
  });

  broadcastToRoom(code, "battle_started", {
    roomCode: code,
    slug: slug || "two-sum",
  });

  return systemMsg;
}

export function broadcastTyping(roomCode, user, isTyping) {
  const code = (roomCode || "").toUpperCase();
  broadcastToRoom(code, "user_typing", {
    user: user || { name: "Player" },
    isTyping: Boolean(isTyping),
  });
}

export function initSocket(httpServer) {
  // Optional Socket.IO if available
  try {
    import("socket.io").then(({ Server }) => {
      const io = new Server(httpServer, {
        cors: { origin: "*", methods: ["GET", "POST"] },
      });
      console.log("[Arena] Socket.IO server layer initialized");
    }).catch(() => {
      console.log("[Arena] Native SSE & Broadcast real-time stream engine active");
    });
  } catch (err) {
    // Ignore
  }
}
