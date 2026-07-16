const express = require("express");

const router = express.Router();

const questionRoutes = require("../modules/questions/questions.routes");

router.use("/questions", questionRoutes);

router.get("/", (req, res) => {
  res.json({
    message: "AlgoQuest AI Backend",
  });
});

module.exports = router;