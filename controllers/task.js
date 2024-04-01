import ErrorHandler from "../middlewares/error.js";
import { Task } from "../models/task.js";

export const newTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    await Task.create({ title, description, user: req.user });
    res.status(201).json({
      success: true,
      message: "Task added successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getMyTask = async (req, res, next) => {
  try {
    const userid = req.user._id;

  const task = await Task.find({ user: userid }); // this find method gives array of object
  res.status(200).json({
    success: true,
    task,
  });
  } catch (error) {
    next(error)
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;
  const task = await Task.findById(id);

  if (!task) {
    return next(new ErrorHandler("Task not Found", 404));
  }
  task.isCompleted = !task.isCompleted;
  await task.save();
  res.status(200).json({
    success: true,
    message: "Task is updated",
  });
  } catch (error) {
    next(error)
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;
  const task = await Task.findById(id);

  if (!task) {
    return next(new ErrorHandler("Task not Found", 404));
  }

  await task.deleteOne();
  res.status(200).json({
    success: true,
    message: "Task is Deleted",
  });
  } catch (error) {
    next(error)
  }
};
