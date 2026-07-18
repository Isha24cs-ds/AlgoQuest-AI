import prisma from "../../../config/prisma.js";

export async function getAllQuestions() {
  return await prisma.question.findMany({
    select: {
      id: true,
      title: true,
      difficulty: true,
    },
  });
}

export async function getQuestionById(id) {
  return await prisma.question.findUnique({
    where: {
      id: Number(id),
    },
  });
}