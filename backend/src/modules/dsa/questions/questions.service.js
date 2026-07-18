import {
  getAllQuestions,
  getQuestionById,
} from "./questions.repository.js";

export async function fetchQuestions() {
  return await getAllQuestions();
}

export async function fetchQuestion(id) {
  return await getQuestionById(id);
}