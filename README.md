# liri-node-app
Welcome to LIRI, a node based helper.
LIRI uses NPM packages to get you relevant information  on your queries.

# Node Instructions
Install Node.js on your system:
https://nodejs.org/en/

# NPM Instructions
After you've installed node, you should have NPM installed. In the root directory of this repository, run "npm install" to download the required packages for this application. 
For reference, these are the required packages at the time of this writing:
    "axios": "^0.19.0",
    "chalk": "^2.4.2",
    "dotenv": "^8.1.0",
    "moment": "^2.24.0",
    "node-spotify-api": "^1.1.1"


# dotenv Instructions
In order to use LIRI's spotify functionality, you'll need to register for a spotify developer account.
Once you have a clientId and Key, you'll need to make a file called .env, and enter data in this format exactly:

This will configure the application to use your spotify credentials in a secure way.

# Commands
If you're unfamiliar with how to run node applications, navigate the to the root directory of this repositiory in a command prompt window. Then run an example command (details below).

LIRI accepts four commands:

1) Spotify-this-song "title of song"
    ex: "node .\liri.js spotify-this Knights of Cydonia"
2) movie-this "movie title"
    ex: "node .\liri.js movie-this Jurassic Park"
3) concert-this "band name"
    ex: "node .\liri.js concert-this Muse"
4) do-what-it-says 

1) Searches for the top spotify song of the song name specified and returns some details, including a preview link
    ex: ![spotify](https://user-images.githubusercontent.com/38290836/65622720-236f9f00-df7b-11e9-81c4-ad194ac4966d.PNG)

2) Searches OMDB and returns releveant details for the movie selected
    ex: ![movie](https://user-images.githubusercontent.com/38290836/65622729-27032600-df7b-11e9-8df4-e1d80b99d606.PNG)

3) Searches the "BandsInTown" api and returns the next concert for the specified band.
    ex: ![concert](https://user-images.githubusercontent.com/38290836/65622736-2bc7da00-df7b-11e9-84f5-88208badc1fe.PNG)

4) ????

