import prisma from "../../../config/prisma.js";

export async function getAllQuestions() {
  return await prisma.question.findMany({
   select: {
  id: true,
  title: true,
  slug: true,
  topic: true,
  pattern: true,
  difficulty: true,
},

  });
}
export async function getQuestionBySlug(slug) {
  return await prisma.question.findUnique({
    where: {
      slug,
    },
  });
}