const axios = require('axios');
const dotenv = require('dotenv').config();
const moment = require('moment');
const Spotify = require('node-spotify-api');
const keys = require('./keys.js');
const fs = require('fs');

const chalk = require("chalk"),
    ctx = new chalk.constructor({ level: 3 }); // 3 for Truecolor: https://github.com/chalk/chalk#chalklevel

const envPath = './.env'
let spotifyUsable = false;
try {
    if (fs.existsSync(envPath)) {
        var spotify = new Spotify({
            id: keys.spotify.id,
            secret: keys.spotify.secret
        });
    }
} catch (err) {
    writeLog("Env file unavailable, spotify is unusable")
}

requestType = process.argv[2];
args = process.argv.slice(3).join(" ");

switch (requestType) {
    case "concert-this":
        concert(args);
        break;
    case "spotify-this-song":
        if (spotifyUsable) {
            spotifySearch(args);
        } else {
            writeLog("Configure your spotify key to use this feature of the app. See README.md for details")
        }
        break;
    case "movie-this":
        movie(args);
        break;
    case "do-what-it-says":
        doWhatItSays();
        break;
    default:
        writeHelp();
        break;
}

function concert(bandName) {
    let queryUrl = "https://rest.bandsintown.com/artists/" + bandName + "/events?app_id=codingbootcamp"
    writeLog("Command: Cocert-This");
    writeLog("Input:" + bandName);
    axios.get(queryUrl).then(
        function (response) {
            writeLog("Venue Name:" + response.data[0].venue.city);
            writeLog("Venue Location:" + response.data[0].venue.name);
            moment().format();
            let date = moment(response.data[0].datetime);
            writeLog("Date: " + String(date));
        }
    ).catch(function (err) {
        throw err;
    })
}

function spotifySearch(song) {
    writeLog("Command: Spotify-This");
    writeLog("Input:" + song);
    if (!song) {
        song = "All the Small Things"
    }
    spotify
        .search({ type: 'track', query: song })
        .then(function (response) {
            //console.log(response.tracks.items[0]);
            writeLog("Album: " + response.tracks.items[0].album.name);
            writeLog("Artist: " + response.tracks.items[0].artists[0].name);
            writeLog("Link: " + response.tracks.items[0].preview_url);
            writeLog("Name: " + response.tracks.items[0].name);
        })
        .catch(function (err) {
            writeLog(err);
        });
}

function movie(movieName) {
    writeLog("Command: movie-This");
    writeLog("Input:" + movieName);
    if (!movieName) {
        movieName = "Mr. Nobody"
    }
    let queryUrl = `http://www.omdbapi.com/?t=${movieName}&y=&plot=short&apikey=trilogy`
    axios.get(queryUrl).then(
        function (response) {
            writeLog("Title: " + response.data.Title);
            writeLog("Year: " + response.data.Year);
            writeLog("Rating:" + response.data.Rated);
            writeLog("Country:" + response.data.Country);
            writeLog("Languages: " + response.data.Language);
            writeLog("Plot: " + response.data.Plot);
            writeLog("Cast:" + response.data.Actors);
            writeLog("Rotten Tomatoes: " + response.data.Ratings[1].Value);
        }
    ).catch(function (err) {
        throw err;
    })
}

function doWhatItSays() {
    writeLog("Command: Do-What-It-Says");
    writeLog("Input:" + "bandName");
    fs.readFile("random.txt", "utf8", function (error, data) {

        if (error) {
            return writeLog(error);
        }

        writeLog(data);

    });

}

function writeHelp() {
    console.log(ctx.keyword('green')("Here is what I can do!"));
    //Spotify Help
    console.log(ctx.keyword('orange')(`spotify-this-song "song title"\n`,
        ctx.keyword('green')(`ex: "node .\liri.js spotify-this-song Knights of Cydonia"\n`)));
    //Movie Help
    console.log(ctx.keyword('orange')(`movie-this "movie title"\n`,
        ctx.keyword('green')(`ex: "node .\liri.js movie-this Jurassic Park"\n`)));
    //Concert Help
    console.log(ctx.keyword('orange')(`concert-this "band name"\n`,
        ctx.keyword('green')(`ex: "node .\liri.js concert-this Muse"\n`)));

    //Do-What-It-Says-Help
    console.log(ctx.keyword('orange')(`movie-this "movie title"\n`,
        ctx.keyword('green')(`ex: "node .\liri.js movie-this Jurassic Park"\n`)));

}


function writeLog(input) {
    logValue = input + "\n"
    console.log(ctx.keyword('green')(logValue));

    fs.appendFile("log.txt", logValue, function (err) {

        if (err) {
            console.log("Error writing log: " + err);
        }
    });

}