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

app.use(cors({ origin: ["http://localhost:5173"], credentials: true }));

// router
app.use("/api", router);

app.listen(PORT, () => {
  console.log("server running on --", PORT);
});
