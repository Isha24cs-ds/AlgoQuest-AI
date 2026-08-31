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