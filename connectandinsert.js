
var mongo = require('mongodb');
var host = "127.0.0.1";
var port = mongo.Connection.DEFAULT_PORT;

var db = new mongo.Db("Nodejs_introduction", new mongo.Server(host, port, {}));
db.open(function(error){
	if (error) {
		console.log("Can't connect. Error :", error);
	} else {
		console.log("Connected at " + host + ":" + port);
		db.collection("user", function(error, collection){
		if (error) {
                	console.log("Error creating collection. Error :", error);
	        } else {
			collection.insert({
					id: "1",
					name: "MarcusQuigley",
					twitter: "bospolini",
					email: "marcusgquigley@gmail.com"
					}, function(){
						console.log("Inserted marcus");
					});
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

