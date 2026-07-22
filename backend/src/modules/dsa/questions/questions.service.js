import {
  getAllQuestions,
  getQuestionBySlug,
} from "./questions.repository.js";

export async function fetchQuestions() {
  return await getAllQuestions();
}
export async function fetchQuestion(slug) {
  return await getQuestionBySlug(slug);
}