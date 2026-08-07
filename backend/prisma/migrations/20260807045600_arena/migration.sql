-- CreateEnum
CREATE TYPE "ArenaStatus" AS ENUM ('WAITING', 'STARTED', 'FINISHED');

-- CreateTable
CREATE TABLE "ArenaRoom" (
    "id" SERIAL NOT NULL,
    "roomCode" TEXT NOT NULL,
    "topic" TEXT NOT NULL,
    "difficulty" "Difficulty" NOT NULL,
    "duration" INTEGER NOT NULL,
    "hostId" INTEGER NOT NULL,
    "status" "ArenaStatus" NOT NULL DEFAULT 'WAITING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ArenaRoom_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ArenaPlayer" (
    "id" SERIAL NOT NULL,
    "roomId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isReady" BOOLEAN NOT NULL DEFAULT false,
    "score" INTEGER NOT NULL DEFAULT 0,
    "finished" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "ArenaPlayer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ArenaRoom_roomCode_key" ON "ArenaRoom"("roomCode");

-- AddForeignKey
ALTER TABLE "ArenaRoom" ADD CONSTRAINT "ArenaRoom_hostId_fkey" FOREIGN KEY ("hostId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArenaPlayer" ADD CONSTRAINT "ArenaPlayer_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "ArenaRoom"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArenaPlayer" ADD CONSTRAINT "ArenaPlayer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
