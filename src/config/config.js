import dotenv from "dotenv";

dotenv.config();

const config = {
  backend: {
    port: process.env.BACKEND_PORT || 3000,
  },
  mongoDB: {
    uri: process.env.MONGO_URI || "mongodb://127.0.0.1/?authSource=admin",
  },
  statusCode: {
    SUCCESS: 200,
    INTERNAL_SERVER_ERROR: 500,
    NOT_FOUND: 404,
    BAD_REQUEST: 400,
  },
};

export default config;
