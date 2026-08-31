import prisma from "../../config/prisma.js";

export async function getUserSubmissionsWithQuestions(userId) {
  return await prisma.submission.findMany({
    where: { userId: Number(userId) },
    include: {
      question: {
        select: {
          id: true,
          title: true,
          slug: true,
          topic: true,
          pattern: true,
          difficulty: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function getAllAvailableQuestions() {
  return await prisma.question.findMany({
    select: {
      id: true,
      title: true,
      slug: true,
      topic: true,
      pattern: true,
      difficulty: true,
      statement: true,
    },
  });
}
