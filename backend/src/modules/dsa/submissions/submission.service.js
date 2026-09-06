import { createSubmission, countQuestionSubmissions, getUserSubmissions } from "./submission.repository.js";
import prisma from "../../../config/prisma.js";

export async function submitSolution({
  userId,
  questionId,
  slug,
  title,
  topic,
  pattern = "General",
  difficulty = "Easy",
  code,
  language = "cpp",
  status = "ACCEPTED",
  runtime = 0,
  memory = 0,
  timeTaken = 0,
  hintsUsed = 0,
}) {
  let targetQuestion = null;

  if (questionId && !isNaN(Number(questionId))) {
    targetQuestion = await prisma.question.findUnique({
      where: { id: Number(questionId) },
    });
  }

  if (!targetQuestion && slug) {
    targetQuestion = await prisma.question.findUnique({
      where: { slug: String(slug) },
    });
  }

  // If question is not in Prisma Question table (e.g. from local practice datasets),
  // upsert it automatically so it has a valid database record and topic relation.
  if (!targetQuestion) {
    const safeSlug = slug || `question-${questionId || Date.now()}`;
    const safeTitle = title || `Practice Problem ${questionId || 1}`;
    const safeTopic = topic || "Arrays";
    const safeDiff = ["Easy", "Medium", "Hard"].includes(difficulty) ? difficulty : "Easy";

    targetQuestion = await prisma.question.upsert({
      where: { slug: safeSlug },
      update: {
        title: safeTitle,
        topic: safeTopic,
        pattern: pattern || "General",
        difficulty: safeDiff,
      },
      create: {
        title: safeTitle,
        slug: safeSlug,
        topic: safeTopic,
        pattern: pattern || "General",
        difficulty: safeDiff,
        statement: "Interactive Practice Problem",
        example: {},
        constraints: [],
        hints: [],
        starterCode: code || "// Starter Code",
        solution: "// Solution",
      },
    });
  }

  const actualQuestionId = targetQuestion.id;
  const previousAttempts = await countQuestionSubmissions(userId, actualQuestionId);
  const attemptsCount = previousAttempts + 1;

  const submission = await createSubmission({
    userId: Number(userId),
    questionId: actualQuestionId,
    code: code || "// No code provided",
    language,
    status,
    runtime: runtime ? parseFloat(runtime) : null,
    memory: memory ? parseFloat(memory) : null,
    topic: targetQuestion.topic || topic || "Arrays",
    pattern: targetQuestion.pattern || pattern || "General",
    difficulty: targetQuestion.difficulty || difficulty || "Easy",
    attemptsCount,
    timeTaken: timeTaken ? parseInt(timeTaken) : null,
    hintsUsed: hintsUsed ? parseInt(hintsUsed) : 0,
  });

  return submission;
}

export async function fetchUserSubmissions(userId) {
  return await getUserSubmissions(userId);
}
