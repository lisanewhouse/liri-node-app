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
var fs = require("fs");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var request = require("request");



var getTweets = function() {
	
	var client = new Twitter(keys.twitterKeys);

	var params = {
		screen_name: "TopFiveRecords_"
	};

	client.get("statuses/user_timeline", params, function(error, tweets, response) {
    if (!error) {
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

var getArtist = function(artist) {
	return artist.name;
};

var getSpotify = function(songName) {
	if (songName === undefined) {
		songName = "What's my age again";
	}

	spotify.search(
		{
			type: "track",
			query: songName
		} ,
		function(err, data) {
			if (err) {
        		console.log("Error occurred: " + err);
        		return;
      		}

			var songs = data.tracks.items;

			for (var i = 0; i < songs.length; i++) {
				console.log(i);
				console.log("artist(s): " + songs[i].artists.map(getArtist));
				console.log("song name: " + songs[i].name);
	        	console.log("preview song: " + songs[i].preview_url);
	        	console.log("album: " + songs[i].album.name);
	        	console.log("-----------------------------------");
			}	
		}
	
	);
};

var getMovie = function(movieName) {
	if (movieName === undefined) {
		movieName = "High Fidelity";
	}

	var urlHit = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=full&tomatoes=true&apikey=40e9cece";

	request(urlHit, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var jsonData = JSON.parse(body);

      console.log("Title: " + jsonData.Title);
      console.log("Year: " + jsonData.Year);
      console.log("Rated: " + jsonData.Rated);
      console.log("IMDB Rating: " + jsonData.imdbRating);
      console.log("Country: " + jsonData.Country);
      console.log("Language: " + jsonData.Language);
      console.log("Plot: " + jsonData.Plot);
      console.log("Actors: " + jsonData.Actors);
      console.log("Rotton Tomatoes URL: " + jsonData.tomatoURL);
    }
  });
};

var doWhatItSays = function() {
  fs.readFile("random.txt", "utf8", function(error, data) {
    console.log(data);

    var dataArr = data.split(",");

    if (dataArr.length === 2) {
      pick(dataArr[0], dataArr[1]);
    }
    else if (dataArr.length === 1) {
      pick(dataArr[0]);
    }
  });
};

// Function for determining which command is executed
var pick = function(caseData, functionData) {
  switch (caseData) {
    case "my-tweets":
      getTweets();
      break;
    case "spotify-this-song":
      getSpotify(functionData);
      break;
    case "movie-this":
      getMovie(functionData);
      break;
    case "do-what-it-says":
      doWhatItSays();
      break;
    default:
      console.log("LIRI doesn't know that");
  }
};

// Function which takes in command line arguments and executes correct function accordigly
var runThis = function(argOne, argTwo) {
  pick(argOne, argTwo);
};

// MAIN PROCESS
// =====================================
runThis(process.argv[2], process.argv[3]);








