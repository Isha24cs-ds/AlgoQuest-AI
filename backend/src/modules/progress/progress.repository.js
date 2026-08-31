import prisma from "../../config/prisma.js";

export async function getUserSubmissionsSummary(userId) {
  return await prisma.submission.findMany({
    where: { userId: Number(userId) },
    select: {
      id: true,
      questionId: true,
      status: true,
      topic: true,
      difficulty: true,
      question: {
        select: {
          topic: true,
        },
      },
    },
  });
}

export async function getTotalQuestionsCount() {
  return await prisma.question.count();
}

export async function getTopicQuestionsCount() {
  const questions = await prisma.question.findMany({
    select: { topic: true },
  });

  const counts = {};
  questions.forEach((q) => {
    const t = q.topic || "Arrays";
    counts[t] = (counts[t] || 0) + 1;
  });

  return counts;
}
