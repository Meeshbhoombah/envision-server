var http = require('http');
var url = require('url');
var querystring = require('querystring');
var express = require('express');
var redis = require('redis');
var clarifai = require('clarifai');

// Set up server
var port = process.env.PORT || 8080;

var clarifai = new Clarifai.App({
    apiKey: 'edac3a3bf1654cc29a7ecf97f921fbf9'
});

var app = express();
var client = redis.createClient();

// Heartbeat
app.get('/', function(req, res) {
    res.send(200);
});

// Recieve POST request w/ image and return first five predictions as a JSON object
app.get('/image', function(req, res) {
    var imageURL = req.param('data');
});

// Save an Image to the database
function saveImage(imageUrl) {
    client.set('image', imageUrl, function(err, reply) {
        function(reply) {
            console.log(reply);
        },
        function(err) {
            conssole.error(err);
        }  
    });
};


// Query Clarifai API with the last saved image and return JSON
function getImagePredictions() {
    client.get('image', function(err, reply) {
        console.log(reply);
        
        var imageUrl = reply;
    
        app.models.predict(Clarifai.GENERAL_MODEL, imageUrl).then(
             function(response) {
               console.log(response);
             },
             function(err) {
               console.error(err);
             }
         );
    });
}

// Start server
app.listen(5000);
console.log('Express server listening on port ' + app.get('port'));
