
var express = require('express');
var fs = require('fs');
var mongo = require('mongodb');
var mongoClient = mongo.MongoClient;
var config = JSON.parse(fs.readFileSync('config.json'));
//var host = config.host;
var port = process.env.PORT || 5000;
var connString = process.env.MONGOHQ_URL;
//var dbPort = mongo.Connection.DEFAULT_PORT;
var app = express();
var tweetsCollection;
app.get("/", function(request, response){
        var content = fs.readFileSync("template.html");

	getTweets(function(tweets){
		var ul='';
		tweets.forEach(function(tweet){
			ul += "<li><strong>" + tweet.id + ": </strong>" + tweet.text + "</li>";
		});
		content = content.toString("utf8").replace("{{INITIAL_TWEETS}}", ul);
		response.setHeader("Content-Type", "text/html");
	        response.send(content);
	});
});

app.listen(port);
console.log("listening on port:", port);



//process.exit(1);

//var db = new mongo.Db("Nodejs_introduction", new mongo.Server(host, dbPort, {}));
mongoClient.connect(connString, function(error, db){
	if (error){
		console.log("Error connecting to db:", error);
	} else {
		tweetsCollection = db.collection('tweets');
	}

});


function getTweets(callback){
	tweetsCollection.find({}, {"limit":10, "_id":-1}).toArray(function(error, tweets){
		if (error){
			console.log("Error getting tweets collection", error);
		} else {
			console.log("No of tweets returned:", tweets.length);
			callback(tweets);
			
			}
		});
		}
	



