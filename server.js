var http = require('http');
var url = require('url');
var querystring = require('querystring');
var express = require('express');
var redis = require('redis'),
    client = redis.createClient();
var clarifai = require('clarifai');
var bodyParser = require('body-parser');
var multer = require('multer');

// Set up server
var clarifai = new Clarifai.App({
    apiKey: 'edac3a3bf1654cc29a7ecf97f921fbf9'
});

var app = express();
app.use(bodyParser({limit: '10gb'}));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ 
    extended: false,
    parameterLimit: 1000000 // experiment with this parameter and tweak
}));

client.on("error", function (err) {
    console.log("Error " + err);
});

// Recieve POST request w/ image and return first five predictions as a JSON object
app.post('/image', function(req, res, data) {
    var imageURL = req.file;
    console.log(req.file);
    console.log(req.body);

    app.models.predict(Clarifai.GENERAL_MODEL, {base64: imageURL}).then(
        function(response) {
            console.log(response.body);
        },
        function(err) {
            console.error(err);
        }
    );
});

app.set('port', process.env.PORT || 8080);
// Start server
http.createServer(app).listen(app.get('port'),
  function(){
    console.log("Express server listening on port " + app.get('port'));
});
