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
    where: { roomCode },
    include: {
      players: {
        include: {
          user: true,
        },
      },
      host: true,
    },
  });
}
        