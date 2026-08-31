import express from "express";
import { getMasteryScores, getWeakAreasHandler, getNextQuestionHandler } from "./adaptive.controller.js";
import { optionalAuthenticate } from "../auth/auth.middleware.js";

const router = express.Router();

router.get("/mastery", optionalAuthenticate, getMasteryScores);
router.get("/weak-areas", optionalAuthenticate, getWeakAreasHandler);
router.get("/next-question", optionalAuthenticate, getNextQuestionHandler);

export default router;
