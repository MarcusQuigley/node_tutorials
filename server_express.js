var fs = require('fs');
var express = require('express');
var config = JSON.parse(fs.readFileSync('config.json'));
var port = process.env.PORT || config.port;

var app = express();

app.get("/", function(request, response){
	response.send("Hello from express");

});

app.listen(port);
console.log("listening on " + port);
