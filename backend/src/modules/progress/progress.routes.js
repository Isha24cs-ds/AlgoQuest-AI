import express from "express";
import { getProgressHandler } from "./progress.controller.js";
import { authenticate } from "../auth/auth.middleware.js";

const router = express.Router();

// GET /api/v1/progress - Strictly uses JWT user token
router.get("/", authenticate, getProgressHandler);

export default router;
