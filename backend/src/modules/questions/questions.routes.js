const express = require("express");

const router = express.Router();

const questionController = require("./questions.controller");

router.get("/", questionController.getQuestions);

module.exports = router;