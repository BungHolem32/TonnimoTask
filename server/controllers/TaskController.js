const tasks = require("../database/tasks.json");
const fs = require("fs");

const TaskController = {
    all(req, res, next) {
        let data = {
            data: null,
            message: "get all tasks"
        };
        if (tasks) {
            data = Object.assign(data, {data: tasks, status: res.statusCode});
        }
        res.json(tasks);
    },
    get(req, res, next) {
        let userId = req.params.userId;
        let data = {
            data: null,
            status: 404,
            message: "task with the user id of " + userId + " not found"
        };

        let userTasks = tasks.filter(task => {
            return task.user_id == userId;
        });

        if (userTasks.length > 0) {
            data = Object.assign(data, {
                data: userTasks,
                status: res.statusCode,
                message: "get specific task"
            });
        }

        res.json(data);
    },
    store(req, res) {
        let {description, done} = req.body;
        let {userId} = req.params;
        let ids = tasks.map(task => {
            return task.id;
        });

        let id = Math.max(...ids) + 1;
        let obj = {description, done, id, user_id: userId};
        let records = tasks;
        records.push(obj);

        TaskController.updateJsonFile(records, res);
    },
    update(req, res) {
        let {userId, id} = req.params;
        let data = req.body;
        let updatedTasks = tasks.map(task => {
            if (task.user_id == userId && task.id == id) {
                Object.assign(task, data);
            }
            return task;
        });

        TaskController.updateJsonFile(updatedTasks, res);
    },
    delete(req, res) {
        let {userId, id} = req.params;
        let index = tasks.findIndex(task => {
            return task.user_id == userId && task.id == id;
        });

        tasks.splice(index, 1);

        TaskController.updateJsonFile(tasks, res);
    },

    // Update json file according to the request
    updateJsonFile(tasks, res) {
        let json = JSON.stringify(tasks);
        fs.writeFile("./database/tasks.json", json, "utf8", function (err, data) {
            res.json({data, message: "success", status: res.statusCode});
        });
    }
};

module.exports = TaskController;