
var requestGit = require('./requestGit.js');

requestGit.getRepos('MarcusQuigley', function(repos){
	console.log('Marcus has the following repos : ', repos);

});
