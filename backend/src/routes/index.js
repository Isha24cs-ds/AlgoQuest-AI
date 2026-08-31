import express from "express";
import questionsRoutes from "../modules/dsa/questions/questions.routes.js";
import authRoutes from "../modules/auth/auth.routes.js";

const router = express.Router();

router.use("/questions", questionsRoutes);
router.use("/auth", authRoutes);

export default router;