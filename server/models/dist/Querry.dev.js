"use strict";

var mongoose = require('mongoose');

var QuerySchema = mongoose.Schema({
  request_guid: {
    type: Number,
    require: true,
    unique: true
  },
  results: {
    type: Array,
    require: true
  }
});
module.exports = mongoose.model('Query', QuerySchema);