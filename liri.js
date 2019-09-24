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
            //let val = JSON.stringify(response);
            writeLog(response);
        }
    ).catch(function(err){
        throw err;
    })
}

// * Artist(s)

// * The song's name

// * A preview link of the song from Spotify

// * The album that the song is from

// * If no song is provided then your program will default to "The Sign" by Ace of Base.


function spotifySearch(song) {
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
    let queryUrl = `http://www.omdbapi.com/?t=${movieName}&y=&plot=short&apikey=trilogy`
    axios.get(queryUrl).then(
        function(response){
            
            writeLog(response);
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