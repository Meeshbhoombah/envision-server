var http = require('http');
var url = require('url');
var querystring = require('querystring');
var express = require('express');
var redis = require('redis'),
    client = redis.createClient();
var clarifai = require('clarifai');


// Set up server
var clarifai = new Clarifai.App({
    apiKey: 'edac3a3bf1654cc29a7ecf97f921fbf9'
});

var app = express();

client.on("error", function (err) {
    console.log("Error " + err);
});

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
        console.log(reply);
        
        if (typeof err !== 'null' || typeof err!== 'undefined') {
            return true
        } else {
            return false
            console.log("Image not set");
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

app.set('port', process.env.PORT || 8080);
// Start server
http.createServer(app).listen(app.get('port'),
  function(){
    console.log("Express server listening on port " + app.get('port'));
});
