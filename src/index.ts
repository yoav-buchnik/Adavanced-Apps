import express, { Application, Request, Response } from "express";
import cors from "cors";
import { connect, disconnect } from "./db";
import config from "./config/config";

import postsRoutes from "./routes/posts-route";
import commentsRoutes from "./routes/comments-route";

const app: Application = express();

await connect(config.mongoDB.uri);

app.use(express.json()); // Accept json body
app.use(cors());
app.use("/api/posts", postsRoutes());
app.use("/api/comments", commentsRoutes());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World! - Backend");
});

app.listen(config.backend.port, () => {
  console.log(`Backend is running on port ${config.backend.port}`);
});

// Handle uncaught exceptions
process.on("uncaughtException", async (error: Error) => {
  console.log("Uncaught Exception:", error);
  try {
    await disconnect();
    console.log("DB disconnect");
    process.exit(0);
  } catch (error) {
    console.log("Error while shutting down:", error);
    process.exit(1);
  }
});
