import express from "express";

import {
  getQuestions,
  getQuestion,
} from "./questions.controller.js";

const router = express.Router();

router.get("/", getQuestions);

router.get("/:id", getQuestion);

export default router;