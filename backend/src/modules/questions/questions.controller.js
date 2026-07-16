const questionService = require("./questions.service");

function getQuestions(req, res) {
  const data = questionService.getAllQuestions();

  res.json({
    success: true,
    questions: data,
  });
}

module.exports = {
  getQuestions,
};