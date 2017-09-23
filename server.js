var http = require('http');
var url = require('url');
var querystring = require('querystring');
var express = require('express');
var clarifai = require('clarifai');

// Set up server
var port = process.env.PORT || 8080;

var clarifai = new Clarifai.App({
    apiKey: 'edac3a3bf1654cc29a7ecf97f921fbf9'
});

var app = express();

// Heartbeat
app.get('/', function(req, res) {
    res.send(200)
});

// POST request w/ image and return first five objects from Clarifai API
app.get('/image', function(req, res) {
    var imageURL = req.param('data');
});

// Take 

// Start server
app.listen(port);
console.log('Express server listening on port ' + app.get('port'));
