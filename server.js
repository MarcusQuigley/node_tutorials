
//var express = require('express');
//var app = express();
//app.use(express.logger());

//app.get('/', function(request, response) {
//  response.send('Hello World!');
//});

//var port = process.env.PORT || 5000;
//app.listen(port, function() {
// console.log("Listening on " + port);
//});

var http = require('http');
console.log("Starting");
var dateNow = new Date();
//var host = "127.0.0.1";
var port =  process.env.PORT || 5000;
var server = http.createServer(function(request, response){
	console.log("Received request " + request.url);
	response.writeHead(200, {"Content-type":"text/plain"});
	response.end("Hello world at " + dateNow);
});
server.listen(port, function(){
	console.log("Listening at :" + port);
});
