const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MovieSchema = new Schema({
    title : {
        type : String,
        required : true
    },
    year : { type : Number },
    genre : { type : String},
    runtime : { type : String },
    director : {
        type : String,
        required : true
    },
    posterUrl: { type: String},
    cast : {
       actor : [
           {
               _id: { type: String},
               name: { type: String}
           }
       ],
       actress : [
           {
               _id: String,
               name: String
           }
       ]
    },
})

const model = mongoose.model('Movies', MovieSchema);
module.exports = model;