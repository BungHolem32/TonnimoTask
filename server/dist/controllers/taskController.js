"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TaskController = function () {
  function TaskController() {
    _classCallCheck(this, TaskController);
  }

  _createClass(TaskController, [{
    key: "all",
    value: function all(req, res) {
      res.json();
    }
  }, {
    key: "get",
    value: function get(req, res) {
      res.json();
    }
  }, {
    key: "store",
    value: function store(req, res) {}
  }, {
    key: "delete",
    value: function _delete(req, res) {}
  }]);

  return TaskController;
}();

exports.default = TaskController;