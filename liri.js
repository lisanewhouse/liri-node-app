//write the code you need to grab data from keys.js. Then store the keys in a variable

//make it so liri.js can take in one of the following commands:
	//my-tweets
		//node liri.js my-tweets
		//this will show your last 20 tweets and when they were created at in your terminal window
	//spotify-this-song
		//node liri.js spotify-this-song '<song name here>'
		//this will show the following information about a song to terminal: artist(s), the song's name, a preview link of the song from Spotify, the album that song is from
		//if no song is provided, defauld to "The Sign" by Ace of Base
		//utilize node-spotify-api package to retrieve info
		//spotify keys Client ID 
				//Client Secret 
	//movie-this
	//do-what-it-says

var keys = require("./keys.js");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var request = require("request");
var fs = require("fs");


var getTweets = function(){
	var client = new Twitter(keys.twitterKeys);

	var params = {screen_name: "top5records_"};

	client.get("statuses/user_timeline", params, function(err, tweets, response) {
    if (!err) {
      for (var i = 0; i < tweets.length; i++) {
        console.log(tweets[i].created_at);
        console.log("");
        console.log(tweets[i].text);
      }
    }
  });
};




var spotify = new Spotify({
	id: "68569e3cee98491e97e485fa8f1f8e47",
	secret: "15851a7933864bf5b697f6544088afeb"
});

spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
 
console.log(data); 
});








