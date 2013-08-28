
var express = require('express');
var fs = require('fs');
var mongo = require('mongodb');
var config = JSON.parse(fs.readFileSync('config.json'));
var host = config.host;
var port = process.env.PORT || 5000;

var app = express();

app.get("/", function(request, response){
        var content = fs.readFileSync("template.html");

	getTweets(function(tweets){
		var ul='';
		tweets.ForEach(function(tweet){
			ul += "<li><strong>" + tweet.user.screen_name + ": </strong>" + tweet.text + "</li>";
		});
		content.toString("utf8").replace("{{INITIAL_TWEETS}}", ul);
		response.setHeader("Content-Type", "text/html");
	        response.send(content);
	});
});

app.listen(port);
console.log("listening on port:", port);



//process.exit(1);

var db = new mongo.Db("Nodejs_introduction", new mongo.Server(host, mongo.Connection.DEFAULT_PORT, {}));
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

function getTweets(callback){
	tweetsCollection.find({}, {"limit":10, "_id":-1}, function(error, cursor){
		if (error){
			console.log("Error getting tweets collection", error);
		} else {
			cursor.toArray(function(error, tweets){
				callback(tweets);
			});
		}
	});

}

