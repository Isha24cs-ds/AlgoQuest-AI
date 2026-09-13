import {
  generateRoom,
  joinRoom,
  getLobby,
} from "./arena.service.js";

export async function createRoom(req, res) {
  try {
    const { battleType, userName, userEmail } = req.body;
    const userId = req.user?.id;
    const name = req.user?.name || userName;
    const email = req.user?.email || userEmail;

    const room = await generateRoom(battleType, name, email, userId);

    res.status(200).json({
      success: true,
      room,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

export async function joinArenaRoom(req, res) {
  try {
    const { roomCode, userName, userEmail } = req.body;
    const userId = req.user?.id;
    const name = req.user?.name || userName;
    const email = req.user?.email || userEmail;

    const room = await joinRoom(roomCode, name, email, userId);

    res.status(200).json({
      success: true,
      room,
    });

  } catch (err) {
    res.status(404).json({
      success: false,
      message: err.message,
    });
  }
}


export async function getLobbyDetails(req, res) {
  try {
    const { code } = req.params;

    const room = await getLobby(code);

    res.status(200).json({
      success: true,
      room,
    });

  } catch (err) {
    res.status(404).json({
      success: false,
      message: err.message,
    });
  }
}

export async function getArenaLobby(req, res) {
  try {
    const { roomCode } = req.params;

    const room = await getLobby(roomCode);

    res.status(200).json({
      success: true,
      room,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: err.message,
    });
  }
}

export async function getRoomChatMessages(req, res) {
  try {
    const { roomCode } = req.params;
    const { getRoomMessages } = await import("../../socket.js");
    const messages = getRoomMessages(roomCode);

    res.status(200).json({
      success: true,
      messages,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

export async function postRoomChatMessage(req, res) {
  try {
    const { roomCode, text, type, id } = req.body;
    const { addRoomMessage } = await import("../../socket.js");

    const sender = {
      id: req.user?.id || null,
      name: req.user?.name || req.body.userName || "Player",
      email: req.user?.email || req.body.userEmail || "",
    };

    const newMsg = addRoomMessage(roomCode, {
      id,
      sender,
      text,
      type: type || "chat",
    });

    res.status(201).json({
      success: true,
      message: newMsg,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

export async function streamRoomEvents(req, res) {
  try {
    const { handleRoomSSEStream } = await import("../../socket.js");
    handleRoomSSEStream(req, res);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

export async function postTypingStatus(req, res) {
  try {
    const { roomCode, isTyping } = req.body;
    const { broadcastTyping } = await import("../../socket.js");

    const sender = {
      id: req.user?.id || null,
      name: req.user?.name || req.body.userName || "Player",
    };

    broadcastTyping(roomCode, sender, isTyping);

    res.status(200).json({
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

export async function postStartBattle(req, res) {
  try {
    const { roomCode, slug } = req.body;
    const { broadcastBattleStart } = await import("../../socket.js");

    const systemMsg = broadcastBattleStart(roomCode, slug || "two-sum");

    res.status(200).json({
      success: true,
      message: systemMsg,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}