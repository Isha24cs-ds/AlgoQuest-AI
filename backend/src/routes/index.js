import express from "express";
import questionsRoutes from "../modules/dsa/questions/questions.routes.js";
import authRoutes from "../modules/auth/auth.routes.js";
import submissionRoutes from "../modules/dsa/submissions/submission.routes.js";
import adaptiveRoutes from "../modules/adaptive/adaptive.routes.js";
import progressRoutes from "../modules/progress/progress.routes.js";

const router = express.Router();

router.use("/questions", questionsRoutes);
router.use("/auth", authRoutes);
router.use("/submissions", submissionRoutes);
router.use("/adaptive", adaptiveRoutes);
router.use("/progress", progressRoutes);

export default router;