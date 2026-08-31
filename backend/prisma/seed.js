import { PrismaClient } from "@prisma/client";
import arraysEasy from "./data/arrays/easy.js";
import arraysMedium from "./data/arrays/medium.js";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  const questions = [...arraysEasy, ...arraysMedium];

  for (const q of questions) {
    console.log("Seeding:", q.title);

    await prisma.question.upsert({
      where: {
        slug: q.slug,
      },

      update: {
        title: q.title,
        topic: q.topic,
        pattern: q.pattern || "General",
        difficulty: q.difficulty,
        statement: q.statement,
        example: q.example,
        constraints: q.constraints,
        hints: q.hints,
        starterCode: q.starterCode,
        solution: q.solution,
        timeComplexity: q.timeComplexity,
        spaceComplexity: q.spaceComplexity,
      },

      create: {
        title: q.title,
        slug: q.slug,
        topic: q.topic,
        pattern: q.pattern || "General",
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
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });