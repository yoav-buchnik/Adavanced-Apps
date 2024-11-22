import express from "express";
import cors from "cors";

const app = express();
const port = 3000;

app.use(express.json()); // Accept json body
app.use(cors());

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
    // todo: close db here.
    process.exit(0);
  } catch (error) {
    console.log("Error while shutting down:", error);
    process.exit(1);
  }
});
