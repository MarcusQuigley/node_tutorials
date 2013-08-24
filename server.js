
var http = require('http');
console.log("Starting");
var dateNow = new Date();
//var host = "127.0.0.1";
var fs = require('fs');
var port =  process.env.PORT || 5000;
var server = http.createServer(function(request, response){
	console.log("Received request " + request.url);
	fs.readFile("./filestoHost" + request.url, function(error, data){
		if (error) {
			response.writeHead(404, {"Content-type":"text/plain"});
			response.end("Sorry page can't be found");
		} else {
			response.writeHead(200, {"Content-type":"text/plain"});
                        response.end(data);

		}
	})
});
server.listen(port, function(){
	console.log("Listening at :" + port);
});
