var Clarifai = require('clarifai');

var app = new Clarifai.App({
    apiKey: 'edac3a3bf1654cc29a7ecf97f921fbf9'
});

// predict the contents of an image by passing in a url
app.models.predict(Clarifai.GENERAL_MODEL, 'https://samples.clarifai.com/metro-north.jpg').then(
    function(response) {
      console.log(response);
    },
    function(err) {
      console.error(err);
    }
);
