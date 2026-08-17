import express from "express";

import {
  createRoom,
  joinArenaRoom,
  getArenaLobby,
} from "./arena.controller.js";

const router = express.Router();

router.post("/create", createRoom);

router.post("/join", joinArenaRoom);

router.get("/lobby/:roomCode", getArenaLobby);

export default router;