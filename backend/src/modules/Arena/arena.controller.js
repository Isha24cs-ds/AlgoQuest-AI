import {
  generateRoom,
  joinRoom,
} from "./arena.service.js";

export async function createRoom(req, res) {
  try {
    const room = await generateRoom();

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
    const { roomCode } = req.body;

    const room = await joinRoom(roomCode);

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