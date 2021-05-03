"use strict";

var express = require('express');

var bodyParser = require('body-parser');

var mongoDB = require('mongodb');

var router = express.Router();

var redis = require('redis');

var Post = require('../../models/Post');

var redisClient = redis.createClient({
  port: 6379
});
redisClient.on('connect', function () {
  console.log('Redis client bağlandı');
});
redisClient.on('error', function (err) {
  console.log('Redis Clientda bir hata var ' + err);
});
process.on('unhandledRejection', function (error) {
  // Will print "unhandledRejection err is not defined"
  console.log('unhandledRejection', error.message);
});
new Promise(function (_, reject) {
  return reject(new Error('woops'));
})["catch"](function (err) {
  // Will not execute
  console.log('caught', err.message);
});
router.get('/', function _callee2(req, res) {
  var minId, maxId, minDate, maxDate, pagination, page, startindex, endindex, posts, results;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          minId = req.query.minId ? parseInt(req.query.minId) : 0;
          maxId = req.query.maxId ? parseInt(req.query.maxId) : 18985536000;
          minDate = req.query.minDate ? Date.parse(req.query.minDate) - 10800000 : 0;
          maxDate = req.query.maxDate ? Date.parse(req.query.maxDate) + (79199000 - 3600000) : 1899231774000;
          pagination = req.query.pagination ? parseInt(req.query.pagination) : 10;
          page = req.query.page ? parseInt(req.query.page) : 1;
          startindex = (page - 1) * pagination;
          endindex = page * pagination;

          if (!redisClient.connected) {
            _context2.next = 12;
            break;
          }

          redisClient.keys('User*', function _callee(err, keys) {
            var personList, i, len, posts, results;
            return regeneratorRuntime.async(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    if (!err) {
                      _context.next = 2;
                      break;
                    }

                    return _context.abrupt("return", console.log(err));

                  case 2:
                    if (!(keys.length > 0)) {
                      _context.next = 8;
                      break;
                    }

                    console.log(minId + maxId + minDate + maxDate);
                    personList = [];

                    for (i = 0, len = keys.length; i < len; i++) {
                      redisClient.get(keys[i], function (err, user) {
                        personList.push(JSON.parse(user));
                        var temporaryResult = {};
                        temporaryResult.result = personList;

                        if (personList.length == keys.length) {
                          if (startindex > 0) {
                            temporaryResult.previous = {
                              page: page - 1,
                              pagination: pagination
                            };
                          }

                          if (endindex < temporaryResult.length) {
                            temporaryResult.next = {
                              page: page + 1,
                              pagination: personList.length - page * pagination
                            };
                          }

                          temporaryResult.total = personList.length;
                          temporaryResult.page = Math.ceil(personList.length / pagination);
                          temporaryResult.result.sort(function (a, b) {
                            return a.timestamp - b.timestamp;
                          });
                          temporaryResult.result = personList.slice(startindex, endindex);
                          res.status(200).send(temporaryResult);
                        }
                      });
                    }

                    _context.next = 24;
                    break;

                  case 8:
                    _context.t0 = regeneratorRuntime;
                    _context.next = 11;
                    return regeneratorRuntime.awrap(loadPostsCollection());

                  case 11:
                    _context.t1 = {
                      id: {
                        $gte: minId,
                        $lte: maxId
                      },
                      timestamp: {
                        $gte: minDate,
                        $lte: maxDate
                      }
                    };
                    _context.t2 = _context.sent.find(_context.t1).toArray();
                    _context.next = 15;
                    return _context.t0.awrap.call(_context.t0, _context.t2);

                  case 15:
                    posts = _context.sent;
                    posts.forEach(function (item) {
                      var userId = "User:" + item.id;
                      var requestId = minId + maxId + minDate + maxDate;
                      redisClient.get(userId, function (err, user) {
                        if (user == null) {
                          var data = JSON.stringify(item); //  JSON.stringify({minId,maxId,minDate,maxDate})

                          redisClient.setex(userId, 10, data, function (err, res) {});
                        } else {
                          console.log(JSON.parse(user));
                        }
                      }); //redis write end
                    });
                    results = {};

                    if (startindex > 0) {
                      results.previous = {
                        page: page - 1,
                        pagination: pagination
                      };
                    }

                    if (endindex < posts.length) {
                      results.next = {
                        page: page + 1,
                        pagination: posts.length - page * pagination
                      };
                    }

                    results.total = posts.length;
                    results.page = Math.ceil(posts.length / pagination);
                    results.result = posts.slice(startindex, endindex);
                    res.json(results);

                  case 24:
                  case "end":
                    return _context.stop();
                }
              }
            });
          });
          _context2.next = 29;
          break;

        case 12:
          _context2.t0 = regeneratorRuntime;
          _context2.next = 15;
          return regeneratorRuntime.awrap(loadPostsCollection());

        case 15:
          _context2.t1 = {
            id: {
              $gte: minId,
              $lte: maxId
            },
            timestamp: {
              $gte: minDate,
              $lte: maxDate
            }
          };
          _context2.t2 = {
            timestamp: 1,
            _id: 1,
            id: 1,
            user_id: 1,
            name: 1,
            IP: 1
          };
          _context2.t3 = _context2.sent.find(_context2.t1).sort(_context2.t2).toArray();
          _context2.next = 20;
          return _context2.t0.awrap.call(_context2.t0, _context2.t3);

        case 20:
          posts = _context2.sent;
          results = {};

          if (startindex > 0) {
            results.previous = {
              page: page - 1,
              pagination: pagination
            };
          }

          if (endindex < posts.length) {
            results.next = {
              page: page + 1,
              pagination: posts.length - page * pagination
            };
          }

          results.total = posts.length;
          results.page = Math.ceil(posts.length / pagination);
          results.result = posts.slice(startindex, endindex);
          console.log(minId, maxId, minDate, maxDate);
          res.json(results);

        case 29:
        case "end":
          return _context2.stop();
      }
    }
  });
});
router.post('/', function _callee3(req, res) {
  var ip, num, userid, posts;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          ip = req.ip.toString().replace('::ffff:', '');
          num = parseInt((Date.now() / 100).toPrecision(11));
          userid = num.toString().slice(2, 10);
          userid = parseInt(userid);
          _context3.next = 6;
          return regeneratorRuntime.awrap(loadPostsCollection());

        case 6:
          posts = _context3.sent;
          _context3.next = 9;
          return regeneratorRuntime.awrap(posts.insertOne({
            user_id: userid,
            id: num,
            name: req.body.name,
            IP: ip,
            timestamp: Date.now()
          }));

        case 9:
        case "end":
          return _context3.stop();
      }
    }
  });
});

function loadPostsCollection() {
  var client, db;
  return regeneratorRuntime.async(function loadPostsCollection$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(mongoDB.MongoClient.connect('mongodb://admin:N35m0i7jlL5Sucph@cluster0-shard-00-00.jw70k.mongodb.net:27017,cluster0-shard-00-01.jw70k.mongodb.net:27017,cluster0-shard-00-02.jw70k.mongodb.net:27017/usersDatabase?ssl=true&replicaSet=atlas-fh4503-shard-0&authSource=admin&retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true
          }));

        case 3:
          client = _context4.sent;
          db = client.db('usersDatabase').collection('postschemas');
          return _context4.abrupt("return", db);

        case 8:
          _context4.prev = 8;
          _context4.t0 = _context4["catch"](0);
          console.log(_context4.t0);

        case 11:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 8]]);
}

module.exports = router;