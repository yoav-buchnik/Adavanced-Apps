import express from "express";
import cors from "cors";
import { connect, disconnect } from "./db.js";
import config from "./config/config.js";

import postsRoutes from "./routes/posts-route.js";

const app = express();

await connect(config.mongoDB.uri);
app.use(express.json()); // Accept json body
app.use(cors());
app.use("/api/posts", postsRoutes());

app.get("/", (req, res) => {
  res.send("Hello World! - Backend");
});

app.listen(config.backend.port, () => {
  console.log(`Backend is running on port ${config.backend.port}`);
});

// Handle uncaught exceptions
process.on("uncaughtException", async (error) => {
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
