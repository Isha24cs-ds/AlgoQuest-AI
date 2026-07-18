import {
  fetchQuestions,
  fetchQuestion,
} from "./questions.service.js";

export async function getQuestions(req, res) {
  try {
    const questions = await fetchQuestions();

    res.status(200).json({
      success: true,
      data: questions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export async function getQuestion(req, res) {
  try {
    const question = await fetchQuestion(req.params.id);

    if (!question) {
      return res.status(404).json({
        success: false,
        message: "Question not found",
      });
    }

    res.status(200).json({
      success: true,
      data: question,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}