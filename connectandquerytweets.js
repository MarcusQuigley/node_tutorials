

var mongo = require('mongodb');
var host = "127.0.0.1";
var port = mongo.Connection.DEFAULT_PORT;
var db = new mongo.Db("Nodejs_introduction", new mongo.Server(host, port, {}));

var getUser = function(callback){
db.open(function(error){
		if (error) {
			console.log("Can't connect. Error:", error);
		} else {
			console.log("Connected at " + host + ":" + port);
			db.collection("tweets", function(error, collection){
				if (error) {
					console.log("Error creating collection. Error :", error);
				} else {
					collection.find({}, function(error, cursor){
						if (error) {
							console.log("Error retrieving collection. Error:", error);
						} else {
							cursor.toArray(function(error, tweets){
								if (error) {
									console.log("error converting data to array:", error);
									callback(false);
								} else {
									callback(tweets);
								}
							});
						}

					});
				
				}
			});
		}
	});
};

getUser(function(tweets){
	if (!tweets) {
	console.log("No tweets found");
	} else {
	tweets.map(function(tweet){
		console.log("Tweet details:", tweet);
	});
	}
});
