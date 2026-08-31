import express from "express";
import {
  createRoom,
  joinArenaRoom,
  getArenaLobby,
} from "./arena.controller.js";
import { optionalAuthenticate } from "../auth/auth.middleware.js";

const router = express.Router();

router.post("/create", optionalAuthenticate, createRoom);

router.post("/join", optionalAuthenticate, joinArenaRoom);

router.get("/lobby/:roomCode", optionalAuthenticate, getArenaLobby);

export default router;