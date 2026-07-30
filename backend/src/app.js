import express from "express";
import cors from "cors";
import aiRoutes from "./modules/ai/ai.routes.js";
import routes from "./routes/index.js";
//import executionRoutes from "./modules/execution/execution.routes.js";


const app = express();
app.use(express.json());
//app.use("/api/v1/execution", executionRoutes);
app.use(cors());
app.use("/api/v1/ai", aiRoutes);

app.use("/api/v1", routes);

export default app;