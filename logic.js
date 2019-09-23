let axios = require('axios')
let dotenv = require('dotenv').config()
let moment = require('moment')
let Spotify = require('node-spotify-api')
let keys = require('./keys.js')

var spotify = new Spotify({
    id: keys.spotify.id,
    secret: keys.spotify.secret
  });

