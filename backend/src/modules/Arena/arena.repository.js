import prisma from "../../config/prisma.js";

export async function createArenaRoom(data) {
  return await prisma.arenaRoom.create({
    data,
  });
}

export async function findArenaRoom(roomCode) {
  return await prisma.arenaRoom.findUnique({
    where: {
      roomCode,
    },
  });
}
export async function getRoomWithPlayers(roomCode) {
  return await prisma.arenaRoom.findUnique({
    where: {
      roomCode,
    },
    include: {
      players: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      },
    },
  });
}
export async function addPlayerToRoom(roomId, userId) {
  // Prevent duplicate player insertion
  const existing = await prisma.arenaPlayer.findFirst({
    where: { roomId, userId },
  });
  if (existing) return existing;

  return await prisma.arenaPlayer.create({
    data: {
      roomId,
      userId,
    },
  });
}

export async function upsertUser(name, email) {
  return await prisma.user.upsert({
    where: { email },
    update: { name },
    create: {
      name,
      email,
      password: "hashed_password_123",
    },
  });
}
        