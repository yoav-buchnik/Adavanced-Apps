import express from "express";
import cors from "cors";
import { connect, disconnect } from "./db.js";

import postsRoutes from "./routes/posts-route.js";

const app = express();
const port = 3000;
const mongoUri = "mongodb://127.0.0.1/fsd1?authSource=admin";

await connect(mongoUri);
app.use(express.json()); // Accept json body
app.use(cors());
app.use("/api/posts", postsRoutes());

app.get("/", (req, res) => {
  res.send("Hello World! - Backend");
});

app.listen(port, () => {
  console.log(`Backend is running on port ${port}`);
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
