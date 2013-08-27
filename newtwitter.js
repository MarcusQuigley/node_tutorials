
var twitter = require('ntwitter');
var credentials= require('./credentials.js');

var searchString = process.argv[2];

if (typeof(searchString)=='undefined') {
	searchString='bieber';
//	console.log("No params entered so lets search for Bieber tweets!!!");
}
console.log("Searching for ", searchString);

var t = new twitter({
   consumer_key: credentials.consumer_key,
   consumer_secret: credentials.consumer_secret,
   access_token_key: credentials.access_token_key,
   access_token_secret: credentials.access_token_secret
});

t.stream(
	'statuses/filter',
    { track: [searchString] },
    function(stream) {
        stream.on('data', function(tweet) {
	console.log("Tweet: ",tweet.text);
	console.log("+++++++++++++++++++++++++++++++++++");
	console.log("");
      });
    }
);
