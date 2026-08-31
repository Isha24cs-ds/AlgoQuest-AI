import {
  createArenaRoom,
  findArenaRoom,
  addPlayerToRoom,
  getRoomWithPlayers,
  upsertUser,
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

export async function generateRoom(
  battleType = "dsa",
  userName = "Guest Host",
  userEmail = "host@questai.io"
) {
  const battleTopics = {
    dsa: "DSA",
    development: "Development",
    aiml: "AI/ML",
    core: "Core CS",
  };

  const topic = battleTopics[battleType] || "DSA";

  // Upsert the actual logged-in user as Host in Postgres DB
  const hostUser = await upsertUser(userName, userEmail);

  // Create room in Postgres DB
  const room = await createArenaRoom({
    roomCode: generateRoomCode(),
    topic: topic,
    difficulty: "Easy",
    duration: 20,
    hostId: hostUser.id,
  });

  // Attach ONLY the actual host player to room in Postgres DB
  await addPlayerToRoom(room.id, hostUser.id);

  // Return complete room with real players from Postgres DB
  const fullRoom = await getRoomWithPlayers(room.roomCode);
  return fullRoom || room;
}

export async function joinRoom(
  roomCode,
  userName = "Guest Player",
  userEmail = "guest@questai.io"
) {
  const room = await findArenaRoom(roomCode);

  if (!room) {
    throw new Error("Room not found");
  }

  // Upsert the actual logged-in user joining the room in Postgres DB
  const joiningUser = await upsertUser(userName, userEmail);

  // Add the joining user to room in Postgres DB
  await addPlayerToRoom(room.id, joiningUser.id);

  const fullRoom = await getRoomWithPlayers(room.roomCode);
  return fullRoom || room;
}

export async function getLobby(roomCode) {
  const room = await getRoomWithPlayers(roomCode);

  if (!room) {
    throw new Error("Room not found");
  }

  return room;
}