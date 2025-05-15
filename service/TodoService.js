const Todo = require('./../models/Todo')

async function getAllTodos() {
    return Todo.find();
}

async function getTodoById(id) {
    return Todo.findById(id);
}

async function saveTodo(todo) {
    let newTodo = new Todo(todo);
    return newTodo.save();
}

async function deleteTodo(id) {
    let existingTodo = await Todo.findById(id);
    if(existingTodo) {
        return Todo.findByIdAndDelete(id);
    }else {
        throw new Error(id + ' is not found.');
    }
}

async function updateTodo(id, todo) {
    let existingTodo = await Todo.findById(id);

    if(existingTodo) {
        return Todo.findByIdAndUpdate(id, todo, {new : true});
    }else {
        throw new Error(id + ' is not found.');
    }
}

module.exports = {
    getAllTodos,
    getTodoById,
    saveTodo,
    deleteTodo,
    updateTodo
}