import express from "express";

import questionsRoutes from "../modules/dsa/questions/questions.routes.js";

const router = express.Router();

router.use("/questions", questionsRoutes);

export default router;