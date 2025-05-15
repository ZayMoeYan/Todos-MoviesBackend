const todoService = require('./../service/TodoService');
const mongoose = require('mongoose');

async function getAllTodos(req, res, next) {
    let todos = await todoService.getAllTodos();
    res.json(todos);
}

async function getTodoById(req, res, next) {
    let id = req.params.id;
    let todo = await todoService.getTodoById(id);
    if(todo) {
        res.json(todo);
    }else {
        res.status(404).json({
            message : 'Fail',
            error : 'Todo ' + id + ' not found.'
        })
    }
}

async function saveTodo(req, res, next) {
    let todo = req.body;
    todo._id = undefined;
    console.log(todo);
    try {
        let newTodo = await todoService.saveTodo(todo);
        res.status(201).json(
            {
                message : 'Success',
                data : newTodo
            }
        )
    } catch (err)
    {
        if(err instanceof mongoose.Error.ValidationError) {
            res.status(400).json({
                message : 'Fail',
                error: err
            })
        }
        res.status(500).json({
            message : 'Fail',
            error : err
        })
    }
}

async function deleteTodo(req, res, next) {
    let id = req.params.id;
    try {
        await todoService.deleteTodo(id);
        res.json({
            message : 'Success',
            data : id
        })
    }catch (err) {
        res.status(404).json({
            message : 'Fail',
            error : 'Todo id ' + id + ' is not found.'
        })
    }
}

async function updateTodo(req, res, next) {
    let id = req.params.id;
    let todo = req.body;
    try {
        let updateTodo = await todoService.updateTodo(id, todo);
        res.json({
            message : 'Success',
            data : updateTodo
        })
    } catch(err) {
        res.status(404).json({
            message : 'Fail',
            error : 'Todo ' +  id + ' is not found.'
        })
    }
}

module.exports = {
    getAllTodos,
    getTodoById,
    saveTodo,
    deleteTodo,
    updateTodo,
}