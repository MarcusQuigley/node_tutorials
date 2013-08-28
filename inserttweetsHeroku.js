
var mongo = require('mongodb');
var mongoClient = mongo.Client;
var connString = process.env.MONGOHQ_URL;

var host = "127.0.0.1";
var port = mongo.Connection.DEFAULT_PORT;

var twitter = require("ntwitter");
var credentials = require("./credentials.js");

var searchString = 'bieber'; //process.argv[2];
//if (typeof(searchString)=='undefined') {
//	searchString='bieber';
//	}

//console.log("searching for", searchString);
//connect to twitter first

var t = new twitter({
   consumer_key: credentials.consumer_key,
   consumer_secret: credentials.consumer_secret,
   access_token_key: credentials.access_token_key,
   access_token_secret: credentials.access_token_secret
});

mongoClient.connect(connString,function(error,db){
	if (error){
		console.log("Error connecting to db:", error);
	} else {
		var collection = db.collection('tweets');
		t.stream('statuses/filter', {track: [searchString]},
                                function(stream){
                                        stream.on('data', function(tweet){
                                                collection.insert([{id: tweet.id}, {text: tweet.text}], function(error, result){
							if (error){
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

