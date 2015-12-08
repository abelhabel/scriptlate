var express = require('express');
var app = express();
var path = require('path');

var scriptlate = require('../scriptlate');
var hitContainer = require('./templates/hit-container');
var hit = require('./templates/hit');
var hitData = require('./data/hit');
var helpers = require('./helpers/helpers');

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.get('/require', function(req, res) {
  res.sendFile(__dirname + '/node_modules/no-eval-require/index.js');
});

app.get('/js/:fileName', function(req, res) {
  if(req.params.fileName === 'scriptlate.js') {
    res.sendFile('/' + req.params.fileName, {root: '../'});
  }else {
    res.sendFile(__dirname + '/' + req.params.fileName);
  }
});

app.get('/css/:fileName', function(req, res) {
  res.sendFile(__dirname + '/css/' + req.params.fileName);
});

app.get('/js/controller/:fileName', function(req, res) {
  res.sendFile(__dirname + '/controller/' + req.params.fileName);
});

app.get('/js/data/:fileName', function(req, res) {
  res.sendFile(__dirname + '/data/' + req.params.fileName);
});

app.get('/js/templates/:fileName', function(req, res) {
  res.sendFile(__dirname + '/templates/' + req.params.fileName);
});

app.get('/text', function(req, res) {
  scriptlate.registerHelpers(helpers);
  hitData.hit = hit(hitData, scriptlate.helpers).tags;
  var html = scriptlate(hitContainer, hitData);
  res.send(html);
});

app.listen(3000);
