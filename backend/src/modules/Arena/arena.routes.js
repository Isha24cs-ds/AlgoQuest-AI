import express from "express";
import {
  createRoom,
  joinArenaRoom,
  getArenaLobby,
  getRoomChatMessages,
  postRoomChatMessage,
  streamRoomEvents,
  postTypingStatus,
  postStartBattle,
} from "./arena.controller.js";
import { optionalAuthenticate } from "../auth/auth.middleware.js";

const router = express.Router();

router.post("/create", optionalAuthenticate, createRoom);

router.post("/join", optionalAuthenticate, joinArenaRoom);

router.get("/lobby/:roomCode", optionalAuthenticate, getArenaLobby);

router.get("/stream/:roomCode", optionalAuthenticate, streamRoomEvents);

router.get("/messages/:roomCode", optionalAuthenticate, getRoomChatMessages);

router.post("/messages", optionalAuthenticate, postRoomChatMessage);

router.post("/typing", optionalAuthenticate, postTypingStatus);

router.post("/start", optionalAuthenticate, postStartBattle);

export default router;