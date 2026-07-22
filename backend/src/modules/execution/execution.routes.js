import express from "express";
import { execute } from "./execution.controller.js";

const router = express.Router();

router.post("/run", execute);

export default router;