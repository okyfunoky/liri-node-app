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
        spotifySearch();
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
            console.log(response);
        }
    ).catch(function(err){
        throw err;
    })
}

function spotifySearch() {

}

function movie(movieName) {
    let queryUrl = `http://www.omdbapi.com/?t=${movieName}&y=&plot=short&apikey=trilogy`
    axios.get(queryUrl).then(
        function(response){
            console.log(response);
        }
    ).catch(function(err){
        throw err;
    })
}

function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function(error, data) {

        // If the code experiences any errors it will log the error to the console.
        if (error) {
          return console.log(error);
        }
      
        // We will then print the contents of data
        console.log(data);
      
        // Then split it by commas (to make it more readable)
        var dataArr = data.split(",");
      
        // We will then re-display the content as an array for later use.
        console.log(dataArr);
      
      });
      
}