"use strict";

var mongoose = require('mongoose');

var Query = require('./models/Query.js');

mongoose.connect('mongodb+srv://fatihcoskun:fatihcoskun@cluster0.tj8hz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
Query.create({
  request_guid: Math.floor(Math.random() * Math.pow(2, 50)),
  results: [0, 2, 3, 1]
}, function (error, query) {
  console.log(error, query);
});