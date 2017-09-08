var keys = require("./keys.js");
var fs = require("fs");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var request = require("request");


//Twitter! node liri.js my-tweets
var getTweets = function() {
	var client = new Twitter(keys.twitterKeys);
	var params = {screen_name: "TopFiveRecords_", count: 20};
	client.get("statuses/user_timeline", params, function(error, tweets, response) {
		if (!error) {
	      	for (var i = 0; i < tweets.length; i++) {
		        console.log((i+1) + ": " + tweets[i].text + "\n----------------------");
      		}
    	}
  	});
};

//Spotify! node liri.js spotify-this-song '<song name here>'
var spotify = new Spotify({
	id: "68569e3cee98491e97e485fa8f1f8e47",
	secret: "15851a7933864bf5b697f6544088afeb"
});

var getArtist = function(artist) {
	return artist.name;
};

var getSpotify = function(songName) {
	if (songName === undefined) {
		songName = "The Sign";
	}

	spotify.search({ type: "track", query: songName }, function(err, data) {
			if (err) {
        		return console.log("Error occurred: " + err);
      		}

			var songs = data.tracks.items;

			for (var i = 0; i < songs.length; i++) {
				console.log(i);
				console.log("Artist(s): " + songs[i].artists.map(getArtist));
				console.log("Track: " + songs[i].name);
	        	console.log("Preview: " + songs[i].preview_url);
	        	console.log("Album: " + songs[i].album.name);
	        	console.log("-----------------------------------");
			}	
		}
	
	);
};

//Request/Omdb node liri.js movie-this 'movie name here'
var getMovie = function(movieName) {
	if (movieName === undefined) {
		//is NOT Mr. Nobody...
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

//
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

var runThis = function(argOne, argTwo) {
  pick(argOne, argTwo);
};

runThis(process.argv[2], process.argv[3]);








