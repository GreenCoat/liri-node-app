require("dotenv").config();
var keys = require('./key.js');
var Twitter = require('twitter');
//var spotify = new Spotify(keys.spotify);
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
	console.log('Twitter');
}

function spotifyThis(){
	console.log('Spotify');
}

function movieThis(){
	console.log('Movie');
}

function doThis(){
	console.log('Do this');
}