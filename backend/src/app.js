import express from "express";
import cors from "cors";
import aiRoutes from "./modules/ai/ai.routes.js";
import routes from "./routes/index.js";
//import executionRoutes from "./modules/execution/execution.routes.js";
import arenaRoutes from "./modules/Arena/arena.routes.js";

const app = express();
app.use(express.json());
//app.use("/api/v1/execution", executionRoutes);
app.use(cors());

app.get("/api/v1/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.use("/api/v1/ai", aiRoutes);
app.use("/api/v1/Arena", arenaRoutes);
app.use("/api/v1", routes);

// Global error handler
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({
    success: false,
    message: err.message || "Internal server error",
  });
});

export default app;