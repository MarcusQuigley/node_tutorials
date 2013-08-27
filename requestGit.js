
var https = require('https');
function getRepos(username, callback) {

var options = {
	host: 'api.github.com',
	path: '/users/'+ username +'/repos',
	method: 'GET'	
};

var request = https.request(options, function(request){
	var body = '';
	request.on("data", function(chunk){
		body +=chunk.toString('utf8');
	});
	request.on("end", function(){
		var repos = [];
		var json = JSON.parse(body);
		json.forEach(function(repo){
			repos.push({
				name: repo.name, 
				description: repo.description
			});
		});
		//console.log("Body : " + body);
		//console.log("count : " + json.length);
		//console.log("repos : ", repos);
		callback(repos);
	});

});

request.end();

}
module.exports.getRepos = getRepos;

