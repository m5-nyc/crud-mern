'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create new instance of the mongoose.schema.
//object that shows the shape of the your database entries.
var CommentsSchema = new Schema({
    author: String,
    text: String
});

// export our module in use in server.js
module.exports = mongoose.model('Comment', CommentsSchema);