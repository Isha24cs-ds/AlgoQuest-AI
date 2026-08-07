import express from "express";
import {
  createRoom,
  joinArenaRoom,
} from "./arena.controller.js";

const router = express.Router();

router.post("/create", createRoom);

router.post("/join", joinArenaRoom);

export default router;