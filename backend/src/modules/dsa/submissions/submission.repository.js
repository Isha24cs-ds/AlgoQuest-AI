import prisma from "../../../config/prisma.js";

export async function createSubmission(data) {
  return await prisma.submission.create({
    data,
  });
}

export async function getUserSubmissions(userId) {
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

export async function countQuestionSubmissions(userId, questionId) {
  return await prisma.submission.count({
    where: {
      userId: Number(userId),
      questionId: Number(questionId),
    },
  });
}
