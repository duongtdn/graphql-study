"use strict";

var express = require('express');
var app = express();
var fs = require('fs');

app.use(express.static(`${__dirname}/public`));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

var server = app.listen('8080', 'localhost', function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log(' Server is running at http://' + host + ':' + port);
});