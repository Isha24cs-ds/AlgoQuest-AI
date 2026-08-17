import {
  createArenaRoom,
  findArenaRoom,
  addPlayerToRoom,
  getRoomWithPlayers,
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

export async function generateRoom(battleType = "dsa") {
  const battleTopics = {
    dsa: "DSA",
    development: "Development",
    aiml: "AI/ML",
    core: "Core CS",
  };

  const topic = battleTopics[battleType] || "DSA";

  const room = await createArenaRoom({
    roomCode: generateRoomCode(),

    topic: topic,

    difficulty: "Easy",

    duration: 20,

    hostId: 1,
  });

  return room;
}
export async function joinRoom(roomCode) {
  const room = await findArenaRoom(roomCode);

  if (!room) {
    throw new Error("Room not found");
  }

  // Temporary test user id
  const userId = 1;

  await addPlayerToRoom(room.id, userId);

  return room;
}
export async function getLobby(roomCode) {
  const room = await getRoomWithPlayers(roomCode);

  if (!room) {
    throw new Error("Room not found");
  }

  return room;
}