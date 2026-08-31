import express from "express";
import { createSubmissionHandler, getUserSubmissionsHandler } from "./submission.controller.js";
import { optionalAuthenticate, authenticate } from "../../auth/auth.middleware.js";

const router = express.Router();

router.post("/", optionalAuthenticate, createSubmissionHandler);
router.get("/user", optionalAuthenticate, getUserSubmissionsHandler);
router.get("/user/:userId", optionalAuthenticate, getUserSubmissionsHandler);

export default router;

