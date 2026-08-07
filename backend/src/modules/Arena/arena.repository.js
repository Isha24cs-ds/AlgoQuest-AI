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
        