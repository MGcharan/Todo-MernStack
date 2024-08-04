import mongoose, { model } from "mongoose";

const todoSchema = new mongoose.Schema({
  title: String,
  description: String,
});

const todoModel = mongoose.model("todo-data", todoSchema);

export default todoModel;
