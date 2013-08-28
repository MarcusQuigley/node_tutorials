
var express = require('express');
var fs = require('fs');
var mongo = require('mongodb');
var config = JSON.parse(fs.readFileSync('config.json'));
var host = config.host;
var port = process.env.PORT || config.port;
var db = new mongo.Db("Nodejs_introduction", new mongo.Server(host, port, {}));
var tweetsCollection;

db.open(function(error){
	if (error) {
		console.log("Error opening database:", error);
	} else {
		console.log("db open at " + host + ":" + port);
		db.collection("tweet", function(error, collection){
			if (error) {		       
				console.log("Error getting data");
			} else {
				tweetsCollection = collection;
			}
		});
	}
});


var app = express();

app.get("/", function(request, response){
	var content = fs.readFileSync("template.html");
	response.setHeader("Content-Type", "text/html");
	response.send(content);	
	
});

app.listen(port);
console.log("listening on port:", port);
