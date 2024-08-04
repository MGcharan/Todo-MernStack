import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import router from "./Router/router.js";
import dbConnect from "./database.js";

import dotenv from "dotenv";
dotenv.config();

// create instance of express
const app = express();
app.use(express.json());
// Create port
const PORT = process.env.PORT;

// Database connection
dbConnect();

// Update CORS settings
const allowedOrigins = [
  "http://localhost:5173",
  "https://giri-todo-app.onrender.com",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin like mobile apps or curl requests
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          "The CORS policy for this site does not allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);

// router
app.use("/api", router);

app.listen(PORT, () => {
  console.log("server running on --", PORT);
});
