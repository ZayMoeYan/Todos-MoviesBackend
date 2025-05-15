const express = require('express');
const router = express.Router();
const todoController = require('../controller/TodoController');

router.get('/', todoController.getAllTodos);
router.get('/:id', todoController.getTodoById);
router.post('/', todoController.saveTodo);
router.delete('/:id', todoController.deleteTodo);
router.put('/:id', todoController.updateTodo)

module.exports =  router;