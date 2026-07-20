import { PrismaClient } from "@prisma/client";
import { arrayQuestions } from "../src/modules/dsa/questions/questions.data.js";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Clear existing questions (optional)
  await prisma.question.deleteMany();

  // Insert all questions
  await prisma.question.createMany({
    data: arrayQuestions,
  });

  console.log(`✅ Successfully inserted ${arrayQuestions.length} questions.`);
}

main()
  .catch((error) => {
    console.error("❌ Seed failed:");
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });