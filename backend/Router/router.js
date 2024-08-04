import express from "express";
const router = express.Router();
import todoModel from "../models/model.js";

// post

router.post("/todos", async (req, res) => {
  //   const newtodo = {
  //     id: todos.length + 1,
  //     title,
  //     description,
  //   };
  //   todos.push(newtodo);
  //   console.log(todos);
  //   res.status(201).json(newtodo);
  const { title, description } = req.body;

  try {
    const newTodo = new todoModel(req.body);
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get all todo item

router.get("/get-todo", async (req, res) => {
  const todoData = await todoModel.find({});
  res.json(todoData);
});

// update todo item

router.put("/update/:id", async (req, res) => {
  try {
    const { title, description } = req.body;
    const id = req.params.id;
    const updatedTodo = await todoModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedTodo) {
      return res.status(400).json({ message: "todolist not found" });
    } else {
      res.json(updatedTodo);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// delete todolist
router.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await todoModel.findByIdAndDelete(id);
    res.status(201).end();
  } catch (err) {
    console.log(err);
    res.status(500).json({ err });
  }
});

export default router;
