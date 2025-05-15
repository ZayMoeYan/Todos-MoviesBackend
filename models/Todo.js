const mongoose = require('mongoose');
const stream = require("node:stream");

const Schema = mongoose.Schema;
const TodoSchema = new Schema(
    {
        title : {
            type : String,
            required : true
        },
        completed : {
            type : Boolean
        }
    }
)

const model = mongoose.model('Todos', TodoSchema);

module.exports = model;