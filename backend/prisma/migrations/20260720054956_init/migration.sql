/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Question` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `topic` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `difficulty` on the `Question` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Difficulty" AS ENUM ('Easy', 'Medium', 'Hard');

-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "slug" TEXT NOT NULL,
ADD COLUMN     "topic" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
DROP COLUMN "difficulty",
ADD COLUMN     "difficulty" "Difficulty" NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Question_slug_key" ON "Question"("slug");
