import {
  createArenaRoom,
  findArenaRoom,
} from "./arena.repository.js";

function generateRoomCode() {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  let roomCode = "";

  for (let i = 0; i < 6; i++) {
    roomCode += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }

  return roomCode;
}

export async function generateRoom() {
  const room = await createArenaRoom({
    roomCode: generateRoomCode(),
    topic: "Arrays",
    difficulty: "Easy",
    duration: 20,

    // Temporary values
    hostId: 1,
  });

  return room;
}
export async function joinRoom(roomCode) {
  const room = await findArenaRoom(roomCode);

  if (!room) {
    throw new Error("Room not found");
  }

  return room;
}