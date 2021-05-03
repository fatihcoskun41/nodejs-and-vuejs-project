"use strict";

var express = require('express');

var mongoDB = require('mongodb');

var router = express.Router();

var moment = require('moment');

router.get('/', function _callee(req, res) {
  var result, pagination, results;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.t0 = regeneratorRuntime;
          _context.next = 3;
          return regeneratorRuntime.awrap(loadQuery());

        case 3:
          _context.t1 = {};
          _context.t2 = _context.sent.find(_context.t1).toArray();
          _context.next = 7;
          return _context.t0.awrap.call(_context.t0, _context.t2);

        case 7:
          result = _context.sent;
          pagination = req.query.pagination ? parseInt(req.query.pagination) : 10;
          results = {};
          results.total = result.length;
          results.page = Math.floor(results.total / pagination) + 1;
          results.result = result;
          console.log(results.result);
          res.json(results);

        case 15:
        case "end":
          return _context.stop();
      }
    }
  });
});
router.post('/', function _callee2(req, res, next) {
  var minId, maxId, minDate, maxDate, query;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          minId = req.query.minId ? parseInt(req.query.minId) : 0;
          maxId = req.query.maxId ? parseInt(req.query.maxId) : 18985536000;
          minDate = req.query.minDate ? Date.parse(req.query.minDate) - 10800000 : 0;
          maxDate = req.query.maxDate ? Date.parse(req.query.maxDate) + (79199000 - 3600000) : 1899231774000;
          _context2.next = 6;
          return regeneratorRuntime.awrap(loadQuery());

        case 6:
          query = _context2.sent;
          _context2.next = 9;
          return regeneratorRuntime.awrap(query.insertOne({
            request_guid: Math.floor(Math.random() * Math.pow(2, 51)),
            minId: req.body.minId,
            maxId: req.body.maxId,
            minDate: Date.parse(req.body.minDate) - 10800000,
            maxDate: Date.parse(req.body.maxDate) + (79199000 - 3600000)
          }));

        case 9:
          res.status(201).send();

        case 10:
        case "end":
          return _context2.stop();
      }
    }
  });
});

function loadQuery() {
  var client, db;
  return regeneratorRuntime.async(function loadQuery$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(mongoDB.MongoClient.connect('mongodb+srv://fatihcoskun:fatihcoskun@cluster0.tj8hz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true
          }));

        case 2:
          client = _context3.sent;
          db = client.db('myFirstDatabase').collection('queries');
          return _context3.abrupt("return", db);

        case 5:
        case "end":
          return _context3.stop();
      }
    }
  });
}

function loadPostsCollection() {
  var client, db;
  return regeneratorRuntime.async(function loadPostsCollection$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(mongoDB.MongoClient.connect('mongodb://admin:N35m0i7jlL5Sucph@cluster0-shard-00-00.jw70k.mongodb.net:27017,cluster0-shard-00-01.jw70k.mongodb.net:27017,cluster0-shard-00-02.jw70k.mongodb.net:27017/usersDatabase?ssl=true&replicaSet=atlas-fh4503-shard-0&authSource=admin&retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true
          }));

        case 2:
          client = _context4.sent;
          db = client.db('usersDatabase').collection('postschemas');
          return _context4.abrupt("return", db);

        case 5:
        case "end":
          return _context4.stop();
      }
    }
  });
}

module.exports = router;