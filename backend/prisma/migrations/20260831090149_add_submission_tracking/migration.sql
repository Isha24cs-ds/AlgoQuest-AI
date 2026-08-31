-- AlterTable
ALTER TABLE "Submission" ADD COLUMN     "attemptsCount" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "difficulty" "Difficulty",
ADD COLUMN     "hintsUsed" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "pattern" TEXT,
ADD COLUMN     "timeTaken" INTEGER,
ADD COLUMN     "topic" TEXT;
