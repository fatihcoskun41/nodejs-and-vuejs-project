"use strict";

var express = require('express'); //const path = __dirname + '/views/'


var main = require('./routes/api/route');

var main2 = require('./routes/query/query');

var mongoose = require('mongoose');

var _require = require('./config'),
    MONGO_URI = _require.MONGO_URI;

var app = express();

var bodyparser = require('body-parser');

var cors = require('cors');
/* var corsOptions = {
    origin: "http://localhost:8080"
  };
 */


app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
  extended: true
})); // app.use(express())

app.use(cors());
app.use('/api/posts', main);
app.get('/', function (req, res) {
  res.send("<h2>Hello</h2>");
});
var PORT = process.env.PORT || 5000;
app.listen(PORT, function () {
  return console.log("Server run at port " + PORT);
});