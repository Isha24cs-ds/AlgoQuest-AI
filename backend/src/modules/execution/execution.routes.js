import express from "express";
import { run } from "./execution.controller.js";

const router = express.Router();

router.post("/run", run);

export default router;