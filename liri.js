require("dotenv").config();
var keys = require('./key.js');
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var request = require('request');
var fs = require('fs');
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var cmd = process.argv[2];

switch(cmd){
	case 'my-tweets':
		myTweets();
		break;
	case 'spotify-this-song':
		spotifyThis();
		break;
	case 'movie-this':
		movieThis();
		break;
	case 'do-what-it-says':
		doThis();
		break;
	default:
		console.log('Invalid command');
}

function myTweets(){
	client.get('statuses/home_timeline', function(error, response) {
  		if(error) throw error;
			response.forEach(function(item){
				if(item.user.name == 'Nicholas Cunningham'){
					console.log(item.created_at);
					console.log(item.text);
				}

			}); 
	});
}

function spotifyThis(){
	var song = '';

	if(process.argv[3]){
		for(var i = 3; i < process.argv.length; i++){
			song += process.argv[i];
		}
	} else {
		song = 'The Sign';
	}

	spotify.search({ type: 'track', query: song }, function(err, data) {
  	if (err) {
    	return console.log('Error occurred: ' + err);
  	}
 
	console.log(data); 
	});
}

function movieThis(){
	var movie = '';

	if(process.argv[3]){
		for(var i = 3; i < process.argv.length; i++){
			movie += process.argv[i];
		}
	} else {
		movie = 'Mr. Nobody';
	}

	request('http://www.omdbapi.com/?apikey=trilogy&t=' + movie, function(err, response, body){
		console.log("Title: " + body.Title);
		console.log("Year: " + body.Year);
		//console.log(body.Ratings);
		console.log("Country: " + body.Country);
		console.log("Language: " + body.Language);
		console.log("Plot: " + body.Plot);
		console.log("Actors:" + body.Actors);
	});
}

function doThis(){
	console.log('Do this');
}