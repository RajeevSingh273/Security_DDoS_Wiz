"use strict";
exports.__esModule = true;
var requestClient = require("request");
var Promise = require("bluebird");
var lodash = require('lodash');
var common = require("../data.layer/models/common.model");
var todo = require("../data.layer/models/todo.model");
var todoContext = require("../data.layer/repositories/todo.context");

var TodoBusinessProcess = (function () {
    function TodoBusinessProcess() {
    }

    TodoBusinessProcess.prototype.GetTodoListMONGO = function (query, callback) {
        var _todoRes = new todo.TodoResponse();
        if (query.Id) {
            var objTodoContext = new todoContext.TodoContext();
            objTodoContext.GetTodoListMONGO(query).then(function (result) {
                if (result.length > 0) {
                    var _todoMap = TodoMap(query, result);
                    callback(null, _todoMap);
                } else {
                    var objTodo = new todo.Todo();
                    objTodo = [];
                    callback(null, objTodo);
                }
            }).catch(function (err) {
                console.log(err);
            });
        }
        else {
            _todoRes.Todo = [];
            _todoRes.ResponseCode = 21;
            _todoRes.ErrorMessage = 'Invalid Id.';
            callback(null, _todoRes);
        }
    };

    TodoBusinessProcess.prototype.AddTodoMONGO = function (query, callback) {
        var Query = new todo.Query();
        var Todo = new todo.Todo();
        Query = query;
        var _todoRes = new todo.TodoResponse();
        var _todo = new todo.Todo();
        if (Query.title) {
            var objTodoContext = new todoContext.TodoContext();
            objTodoContext.AddTodoMONGO(Query).then((result, err) => {
                if (result) {
                    callback(null, { message: "Todo saved successfully!" });
                } else {
                    callback(err, null);
                }
            });
        }
        else {
            _todoRes.Todo = [];
            _todoRes.ResponseCode = 21;
            _todoRes.ErrorMessage = 'Invalid Id.';
            callback(null, _todoRes);
        }
    };

    TodoBusinessProcess.prototype.EditTodoMONGO = (query, callback) => {
        var Query = new todo.Query();
        var Todo = new todo.Todo();
        Query = query;
        var _todoRes = new todo.TodoResponse();
        var _todo = new todo.Todo();
        if (Query.title) {
            var objTodoContext = new todoContext.TodoContext();
            objTodoContext.EditTodoMONGO(Query).then((err, result) => {
                if (result) {
                    callback(null, { message: "Todo Updated successfully!" });
                } else {
                    callback(err, null);
                }
            });
        }
        else {
            _todoRes.Todo = [];
            _todoRes.ResponseCode = 21;
            _todoRes.ErrorMessage = 'Invalid Id.';
            callback(null, _todoRes);
        }
    };

    TodoBusinessProcess.prototype.DeleteTodoMONGO = function (query, callback) {
        var Query = new todo.Query();
        var Todo = new todo.Todo();
        Query = query;
        var _todoRes = new todo.TodoResponse();
        var _todo = new todo.Todo();
        if (Query.title) {
            var objTodoContext = new todoContext.TodoContext();
            objTodoContext.DeleteTodoMONGO(Query).then(function (result) {
                if (result.length > 0) {
                    var _todoMap = TodoMap(Query, result);
                    callback(null, _todoMap);
                } else {
                    var objTodo = new todo.Todo();
                    objTodo = [];
                    callback(null, objTodo);
                }
            });
        }
        else {
            _todoRes.Todo = [];
            _todoRes.ResponseCode = 21;
            _todoRes.ErrorMessage = 'Invalid Id.';
            callback(null, _todoRes);
        }
    };

    TodoBusinessProcess.prototype.GetTodoListSQL = function (query, callback) {
        var Query = new todo.Query();
        var Todo = new todo.Todo();
        Query = query;
        var _todoRes = new todo.TodoResponse();
        var _todo = new todo.Todo();
        if (Query.title) {
            var ObjUserContext = new userContext.UserContext();
            ObjUserContext.GetAccount(Query).then(function (resultAcc) {//Handle Null Result
                Query.AccountId = resultAcc.recordset[0].lAccountID;
                Query.SourceID = resultAcc.recordset[0].iSourceID;
                if (result.length > 0) {
                    var _todoMap = TodoMap(Query, result);
                    callback(null, _todoMap);
                } else {
                    var objTodo = new todo.Todo();
                    objTodo = [];
                    callback(null, objTodo);
                }
            });
        }
        else {
            _todoRes.Todo = _todo;
            _todoRes.ResponseCode = 21;
            _todoRes.ErrorMessage = 'Invalid Id.';
            callback(null, _todoRes);
        }
    };

    return TodoBusinessProcess;
}());
exports.TodoBusinessProcess = TodoBusinessProcess;


var TodoMap = function (dQuery, result) {
    var _dQuery = new todo.Query();
    _dQuery = dQuery;
    var objTodoMapArr = new Array();
    if (result) {
        result.forEach(function (element) {
            var objTodo = new todo.Todo();
            objTodo.Id = element.Id;
            objTodo.title = element.title;
            objTodo.description = element.title;
            objTodo.priority = element.priority;
            objTodo.status = element.status;
            objTodo.created = element.created;
            objTodo.updated = element.updated;
            objTodoMapArr.push(objTodo);
        }, this);

        return objTodoMapArr;
    } else {
        objTodoMapArr = [];
        return objTodoMapArr;
    }
}
