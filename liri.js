let axios = require('axios');
let dotenv = require('dotenv').config();
let moment = require('moment');
let Spotify = require('node-spotify-api');
let keys = require('./keys.js');
let fs = require('fs');

var spotify = new Spotify({
    id: keys.spotify.id,
    secret: keys.spotify.secret
});

requestType = process.argv[2];
args = process.argv.slice(3).join(" ");

switch (requestType) {
    case "concert-this":
        concert(args);
        break;
    case "spotify-this-song":
        spotifySearch(args);
        break;
    case "movie-this":
        movie(args);
        break;
    case "do-what-it-says":
        doWhatItSays();
        break;
    default:
        break;
}

function concert(bandName) {
    let queryUrl = "https://rest.bandsintown.com/artists/" + bandName + "/events?app_id=codingbootcamp"
    axios.get(queryUrl).then(
        function(response){
            writeLog(response);
            writeLog("Venue Name:" + response.data[0].venue.city);
            writeLog("Venue Location:" + response.data[0].venue.name);
            writeLog("Date: " + response.data[0].datetime);
        }
    ).catch(function(err){
        throw err;
    })
}

function spotifySearch(song) {
    if(!song){
        song = "All the Small Things"
    }
    spotify
    .search({ type: 'track', query: song })
    .then(function(response) {
      //console.log(response.tracks.items[0]);
      console.log("Album: " + response.tracks.items[0].album.name);
      console.log("Artist: " + response.tracks.items[0].artists[0].name);
      console.log("Link: " + response.tracks.items[0].preview_url);
      console.log("Name: " + response.tracks.items[0].name);
    })
    .catch(function(err) {
      console.log(err);
    });
}

function movie(movieName) {
    if(!movieName){
        movieName = "Mr. Nobody"
    }
    let queryUrl = `http://www.omdbapi.com/?t=${movieName}&y=&plot=short&apikey=trilogy`
    axios.get(queryUrl).then(
        function(response){
            writeLog("Title: " + response.data.Title);
            writeLog("Year: " + response.data.Year);
            writeLog("Rating:" + response.data.Rated);
            writeLog("Country:"+ response.data.Country);
            writeLog("Languages: " + response.data.Language);
            writeLog("Plot: " + response.data.Plot);
            writeLog("Cast:" + response.data.Actors);
            writeLog("Rotten Tomatoes: " + response.data.Ratings[1].Value);
        }
    ).catch(function(err){
        throw err;
    })
}

function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function(error, data) {

        if (error) {
          return writeLog(error);
        }

        writeLog(data);
        console.log(data);
      
      });
      
}

function writeLog(input){
    logValue = input
    console.log(logValue);
    fs.appendFile("log.txt", logValue, function(err) {
        
        if (err) {
          console.log(err);
        }
      });
}