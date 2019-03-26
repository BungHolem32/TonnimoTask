"use strict";

var express = require("express");
var router = express.Router();
var tasks = require("../database/tasks.json");

/* GET home page. */
router.get("/task", function (req, res, next) {
  res.json(tasks);
});

module.exports = router;