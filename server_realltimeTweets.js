
var express = require('express');
var fs = require('fs');
var mongo = require('mongodb');
var mongoClient = mongo.MongoClient;
var config = JSON.parse(fs.readFileSync('config.json'));
//var host = config.host;
var port = process.env.PORT || 5000;
var connString = process.env.MONGOHQ_URL;
var searchString = 'nick cave';
//var dbPort = mongo.Connection.DEFAULT_PORT;
var twitter = require("ntwitter");
var credentials = require("./credentials.js");

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
                t.stream('statuses/filter', {track: [searchString]},
                                function(stream){
                                        stream.on('data', function(tweet){
                                                tweetsCollection.insert([{id: tweet.id}, {text: tweet.text}], function(error, result){                                                     						  if (error){
                                                                console.log("Error inserting tweet:", error);
                                                        } else {                                         
                                                               console.log("Inserted", result);
                                                        }
                                                        });

                                        });
                                }
                        );
	}

});


function getTweets(callback){
	//tweetsCollection.find({}, {"limit":10, "sort": {"_id",-1}}).toArray(function(error, tweets){
	tweetsCollection.find({}, {"limit":10}).sort({"_id":-1}).toArray(function(error, tweets){

		if (error){
			console.log("Error getting tweets collection", error);
		} else {
			var currentDateTime = new Date();
			console.log("No of tweets returned: " + tweets.length + " at " + currentDateTime);
			callback(tweets);
		}
	});
}

var t = new twitter({
   consumer_key: credentials.consumer_key,
   consumer_secret: credentials.consumer_secret,
   access_token_key: credentials.access_token_key,
   access_token_secret: credentials.access_token_secret
});	



