import { createSubmission, countQuestionSubmissions, getUserSubmissions } from "./submission.repository.js";
import prisma from "../../../config/prisma.js";

export async function submitSolution({
  userId,
  questionId,
  code,
  language = "cpp",
  status = "ACCEPTED",
  runtime = 0,
  memory = 0,
  timeTaken = 0,
  hintsUsed = 0,
}) {
  const question = await prisma.question.findUnique({
    where: { id: Number(questionId) },
  });

  if (!question) {
    throw new Error("Question not found");
  }

  const previousAttempts = await countQuestionSubmissions(userId, questionId);
  const attemptsCount = previousAttempts + 1;

  const submission = await createSubmission({
    userId: Number(userId),
    questionId: Number(questionId),
    code: code || "// No code provided",
    language,
    status,
    runtime: runtime ? parseFloat(runtime) : null,
    memory: memory ? parseFloat(memory) : null,
    topic: question.topic,
    pattern: question.pattern,
    difficulty: question.difficulty,
    attemptsCount,
    timeTaken: timeTaken ? parseInt(timeTaken) : null,
    hintsUsed: hintsUsed ? parseInt(hintsUsed) : 0,
  });

  return submission;
}

export async function fetchUserSubmissions(userId) {
  return await getUserSubmissions(userId);
}
