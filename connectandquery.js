

var mongo = require('mongodb');
var host = "127.0.0.1";
var port = mongo.Connection.DEFAULT_PORT;
var db = new mongo.Db("Nodejs_introduction", new mongo.Server(host, port, {}));

var getUser = function(id_var, callback){
db.open(function(error){
		if (error) {
			console.log("Can't connect. Error:", error);
		} else {
			console.log("Connected at " + host + ":" + port);
			db.collection("user", function(error, collection){
				if (error) {
					console.log("Error creating collection. Error :", error);
				} else {
					collection.find({"id":id_var.toString()}, function(error, cursor){
						if (error) {
							console.log("Error retrieving collection. Error:", error);
						} else {
							cursor.toArray(function(error, users){
								if (error) {
									console.log("error converting data to array:", error);
									callback(false);
								} else {
									callback(users[0]);
								}
							});
						}

					});
				
				}
			});
		}
	});
};

getUser(1, function(user){
	if (!user) {
	console.log("No user found");
	} else {
	console.log("found a user", user);
	}
});
