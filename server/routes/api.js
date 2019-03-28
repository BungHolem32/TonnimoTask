var express = require("express");
var router = express.Router();

const TaskController = require('../controllers/TaskController');

// Get all tasks
router.get("/tasks", TaskController.all);

// Get Tasks According to User Id
router.get("/user/:userId/tasks", TaskController.get);

//Save Task
router.post("/user/:userId/task", TaskController.store);

// Update Task
router.put("/user/:userId/task/:id", TaskController.update);

//Remove Task
router.delete("/user/:userId/task/:id", TaskController.delete);

module.exports = router;
