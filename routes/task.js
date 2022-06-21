const express = require("express");

const router = express.Router();

const {
  getALLTasks,
  createTask,
  getTask,
  updateTask,
  deleteTASK,
} = require("../controllers/task");

router.route("/").get(getALLTasks).post(createTask);

router
  .route("/:id")
  .get(getTask)
  .patch(updateTask)
  .delete(deleteTASK)

module.exports = router;
