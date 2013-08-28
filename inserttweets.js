
var mongo = require('mongodb');
var host = "127.0.0.1";
var port = mongo.Connection.DEFAULT_PORT;
var twitter = require("ntwitter");
var credentials = require("./credentials.js");

var searchString = process.argv[2];
if (typeof(searchString)=='undefined') {
	searchString='bieber';
	}

console.log("searching for", searchString);
//connect to twitter first

var t = new twitter({
   consumer_key: credentials.consumer_key,
   consumer_secret: credentials.consumer_secret,
   access_token_key: credentials.access_token_key,
   access_token_secret: credentials.access_token_secret
});


var db = new mongo.Db("Nodejs_introduction", new mongo.Server(host, port, {}));
db.open(function(error){
	if (error) {
		console.log("Can't connect. Error :", error);
	} else {
		console.log("Connected at " + host + ":" + port);
		db.collection("tweets", function(error, collection){
		if (error) {
                	console.log("Error creating collection. Error :", error);
	        } else {
			t.stream(
				'statuses/filter', {track: [searchString]}, 
				function(stream){
					stream.on('data', function(tweet){
						
						collection.insert({
		                                        id: tweet.id,
                		                        text: tweet.text
                		                        }, function(){
                                		                console.log("Inserted", tweet.text);
                                        		});
					
					});

				}



			);


			 collection.insert({
                                        id: "1",
                                        name: "JoeBloggs",
                                        twitter: "job",
                                        email: "joeblogs@gmail.com"
                                        }, function(){
                                                console.log("Inserted Joe");
                                        });







		};
	})
	}
});

