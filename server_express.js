var fs = require('fs');
var express = require('express');
var config = JSON.parse(fs.readFileSync('config.json'));
var port = process.env.PORT || config.port;

var app = express();

app.use(app.router);
app.use(express.static(__dirname + '/filestoHost'));

app.get("/", function(request, response){
	response.send("Hello from express");

});

app.get("/hello/:texts", function(request, response){
	response.send("HELLO " + request.params.text);
});

app.listen(port);
console.log("listening on " + port);
