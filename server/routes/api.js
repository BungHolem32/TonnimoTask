var express = require("express");
var router = express.Router();
var tasks = require("../database/tasks.json");
var fs = require("fs");

// Get all tasks
router.get("/tasks", function(req, res, next) {
  let data = {
    data: null,
    message: "get specific task"
  };
  if (tasks) {
    data = Object.assign(data, { data: tasks, status: res.statusCode });
  }
  res.jsonp(tasks);
});

// Get Specific Task
router.get("/user/:user_id/tasks", function(req, res, next) {
  let id = req.params.user_id;
  let data = {
    data: null,
    status: 404,
    message: "task with the user id of " + id + " not found"
  };

  let userTasks = tasks.filter(task => {
    return task.user_id == id;
  });

  if (userTasks.length > 0) {
    data = Object.assign(data, {
      data: userTasks,
      status: res.statusCode,
      message: "get specific task"
    });
  }

  res.json(data);
});

//Save Task
router.post("/user/:user_id/task", (req, res) => {
  let { description, done } = req.body;
  let { user_id } = req.params;
  let ids = tasks.map(task => {
    return task.id;
  });

  let id = Math.max(...ids) + 1;
  let obj = { description, done, id, user_id };
  let records = tasks;
  records.push(obj);

  updateJsonFile(records, res);
});

// Update Task
router.put("/user/:user_id/task/:id", (req, res) => {
  let { user_id, id } = req.params;
  let data = req.body;

  let updatedTasks = tasks.map(item => {
    if (item.user_id == user_id && item.id == id) {
      Object.assign(item, data);
    }
    return item;
  });

  updateJsonFile(updatedTasks, res);
});

//Remove Task
router.delete("/user/:user_id/task/:id", (req, res) => {
  let { user_id, id } = req.params;
  let index = tasks.findIndex(item => {
    return item.user_id == user_id && item.id == id;
  });

  tasks.splice(index, 1);
  updateJsonFile(tasks, res);
});

// Update json file according to the requrest
function updateJsonFile(tasks, res) {
  let data = {
    data: null,
    status: 404
  };
  var json = JSON.stringify(tasks);
  fs.writeFile("./database/tasks.json", json, "utf8", function(err, data) {
    res.json({ data, message: "succes", status: res.statusCode });
  });
}

module.exports = router;
