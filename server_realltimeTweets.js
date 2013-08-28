
var express = require('express');
var fs = require('fs');
var config = JSON.parse(fs.readFileSync('config.json'));
var host = config.host;
var port = process.env.PORT || config.port;

var app = express();

app.get("/", function(request, response){
	response.send("hello...");	
	
});

app.listen(host, port);
console.log("listening on port:", port);
