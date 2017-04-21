'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create new instance of the mongoose.schema.
//object that shows the shape of the your database entries.
var PostsSchema = new Schema({
    title: String,
    description: String
});

// export our module in use in server.js
module.exports = mongoose.model('Post', PostsSchema);