
var express = require('express');
var fs = require('fs');
var config = JSON.parse(fs.readFileSync('config.json'));
var host = config.host;
var port = process.env.PORT || config.port;

var app = express();

app.get("/", function(request, response){
	var content = fs.readFileSync("template.html");
	response.setHeader("Content-Type", "text/html");
	response.send(content);	
	
});

app.listen(port);
console.log("listening on port:", port);
