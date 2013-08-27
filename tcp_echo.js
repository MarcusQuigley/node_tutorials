var net = require('net');
net.createServer(function(socket){
	socket.on('connect', function(data){
		console.log("Connection from" + socket.remoteAddress);
		socket.write("Welcome to humble server");
	});

	//incoming data event
	socket.on('data', function(data) {
		console.log("client said " + data);
		socket.write("you said " + data);
	});

	//disconnect event
	socket.on('end', function(){
		console.log("someones gone");
	});

}).listen(5000);

console.log("TCP ECHO SERVER STARTED ON 5000");
