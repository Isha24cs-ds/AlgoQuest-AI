import { PrismaClient } from "@prisma/client";
import arraysEasy from "./data/arrays/easy.js";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  for (const q of arraysEasy) {
    await prisma.question.upsert({
      where: {
        slug: q.slug,
      },
      update: {},

      create: {
        title: q.title,
        slug: q.slug,
        topic: q.topic,
        difficulty: q.difficulty,
        statement: q.statement,
        example: q.example,
        constraints: q.constraints,
        hints: q.hints,
        starterCode: q.starterCode,
        solution: q.solution,
        timeComplexity: q.timeComplexity,
        spaceComplexity: q.spaceComplexity,

        testCases: {
          create: q.testCases.map((tc) => ({
            input: tc.input,
            expected: tc.expected,
            isHidden: tc.isHidden,
          })),
        },
      },
    });
  }

  console.log("✅ Questions inserted successfully!");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });