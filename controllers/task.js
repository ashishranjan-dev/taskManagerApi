
const asyncWrapper = require("../middlewares/async");
const Task = require("../models/task");
const {CustomError} =require('../errors/custom_error')

const getALLTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find();
  if (tasks) {
    res.status(200).json({
      sucess: true,
      data: tasks,
    });
  } else {
    

    res.status(400).json({
      sucess: false,
      message: "something went wrong",
    });
  }
});

//
const createTask = asyncWrapper(async (req, res, next) => {
  const name = req.body.name;
  if (name) {
    const data = new Task({
      name: name,
    });
    await data.save();
    res.status(200).json({
      sucess: true,
      message: "Task Created Sucessfully",
      data: data,
    });
  } else {
    res.status(400).json({
      sucess: false,
      message: "Name required",
    });
  }
});

///

const getTask = asyncWrapper(async (req, res,next) => {
  const { id: taskid } = req.params;
  const data = await Task.findById(taskid);
  if (!data) {
    return next(CustomError( `No task with found with ${taskid}`,404))
  /*   res.status(400).json({
      sucess: false,
      message: `No task with found with ${taskid}`,
    }); */
  } else {
    res.status(200).json({
      sucess: true,
      data: data,
    });
  }
});

const updateTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;

  const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!task) {
    return next(CustomError( `No task with found with ${taskID}`,404))
  }

  res.status(200).json({
    sucess: true,
    message: "data updated",
  });
});

const deleteTASK = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndDelete({ _id: taskID });
  if (!task) {

    return next(CustomError( `No task with found with ${taskID}`,404))
    
  }
  res.status(200).json({
    sucess: true,
    message: "task has been deleted",
  });
});

const editTask = asyncWrapper(async (req, res, next) => {
  const { id: taskid } = req.params;

  const newname = req.body;

  const data = await Task.findById(taskid);

  if (!data) {
    res.status(400).json({
      sucess: false,
      message: `No task with found with ${taskid}`,
    });
  } else {
    await Task.findByIdAndUpdate(taskid, {
      name: newname,
    });

    res.status(200).json({
      sucess: true,
      data: data,
    });
  }
});

module.exports = {
  getALLTasks,
  createTask,
  getTask,
  updateTask,
  deleteTASK,
};
