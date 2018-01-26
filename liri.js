require("dotenv").config();
var keys = require('./key.js');
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var request = require('request');
var fs = require('fs');
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var cmd = process.argv[2];
var data = '';

if(process.argv[3]){
	for(var i = 3; i < process.argv.length; i++){
		data += process.argv[i] + " ";
	}
}

executeCommand(cmd, data);

function executeCommand(cmd, data){
	switch(cmd){
		case 'my-tweets':
			myTweets(cmd);
			break;
		case 'spotify-this-song':
			spotifyThis(cmd, data);
			break;
		case 'movie-this':
			movieThis(cmd, data);
			break;
		case 'do-what-it-says':
			doThis(cmd);
			break;
		default:
			console.log('Invalid command');
	}
}

function myTweets(cmd){
	client.get('statuses/home_timeline', function(error, response) {
  		if(error) throw error;
			response.forEach(function(item){
				if(item.user.name == 'Nicholas Cunningham'){
					console.log(item.created_at);
					console.log(item.text);
				}

			}); 
	});

	recordCommand(cmd);
}

function spotifyThis(cmd, data){
	var song = data;

	if(song == ""){
		song = 'The Sign';
	} 

	spotify.search({ type: 'track', query: song }, function(err, data) {
  	if (err) {
    	console.log('Error occurred: ' + err);
  	}
 
	console.log(data.tracks); 
	});

	recordCommand(cmd, song);
}

function movieThis(cmd, data){
	var movie = data;

	if(movie == ""){
		movie = 'Mr. Nobody';
	}

	request('http://www.omdbapi.com/?apikey=trilogy&t=' + movie, function(err, response, body){
		var body = JSON.parse(body);

		console.log("Title: " + body.Title);
		console.log("Year: " + body.Year);
		console.log("IMDB Rating: " + body.Ratings[0].Value);
		console.log("RT Rating: " + body.Ratings[1].Value);
		console.log("Country: " + body.Country);
		console.log("Language: " + body.Language);
		console.log("Plot: " + body.Plot);
		console.log("Actors:" + body.Actors);
	});

	recordCommand(cmd, movie);
}

function doThis(cmd){
	fs.readFile("random.txt", "utf8", function(err, data){
		if(err){
			console.log('Error occurred: ' + err);
		}

		var commands = data.split(",");
		executeCommand(commands[0], commands[1]);
		console.log(commands);
	});

	recordCommand(cmd);
}

function recordCommand(cmd){
	fs.appendFile("log.txt", cmd + "/n", function(err){
		if(err){
			console.log('Error occurred: ' + err);
		}
	});
}

function recordCommand(cmd, data){
	fs.appendFile("log.txt", cmd + " " + data + "/n", function(err){
		if(err){
			console.log('Error occurred: ' + err);
		}
	});
}