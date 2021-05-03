"use strict";

var mongoose = require('mongoose');

var Schema = mongoose.Schema;
mongoose.connect('mongodb://admin:N35m0i7jlL5Sucph@cluster0-shard-00-00.jw70k.mongodb.net:27017,cluster0-shard-00-01.jw70k.mongodb.net:27017,cluster0-shard-00-02.jw70k.mongodb.net:27017/usersDatabase?ssl=true&replicaSet=atlas-fh4503-shard-0&authSource=admin&retryWrites=true&w=majority', {
  useUnifiedTopology: true,
  useNewUrlParser: true
});
var postSchema = new Schema({
  _id: {
    type: Number
  },
  id: {
    type: Number,
    "default": 1
  },
  user_id: {
    type: Number,
    "default": 1000
  },
  timestamp: {
    type: Date,
    "default": Date.now()
  },
  IP: {
    type: String
  },
  name: {
    type: String,
    required: true
  }
});
module.exports = mongoose.model('Post', postSchema);