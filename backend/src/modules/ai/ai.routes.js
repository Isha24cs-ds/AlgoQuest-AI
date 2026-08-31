import express from "express";
import { chat } from "./ai.controller.js";
import { optionalAuthenticate } from "../auth/auth.middleware.js";

const router = express.Router();

router.post("/chat", optionalAuthenticate, chat);

export default router;