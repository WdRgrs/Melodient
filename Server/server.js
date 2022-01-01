require('dotenv').config();
let express = require('express');
let request = require('request');
let querystring = require('querystring');
const cors = require('cors'); 
const bodyParser = require('body-parser'); 
const mongoose = require('mongoose')
const GenreModel = require('./models/GenreCount') 
const SongModel = require('./models/SongCount')

let app = express();
app.use(cors()) 

app.use(bodyParser.urlencoded({ 
  extended: true
}));
app.use(bodyParser.json()) 

mongoose.connect(process.env.DATA_SERVER, {
  useNewUrlParser: true,
})

app.post('/song', async (req, res) => {
  const { name, uri, artists } = req.body
  console.log(req.body.uri)

  const song = new SongModel({songName: name, songURI: uri, artists: artists })
  try {
    await song.save();
    res.send("inserted data")
  } catch(err) {
    console.log(err)
  }
})

app.get('/song_return', async(req, res) => {
  SongModel.find({}, (err, result) => { 
    if (err) {
      res.send(err)
    } 

    res.send(result);
  })
})



let redirect_uri = 
  process.env.REDIRECT_URI || 
  'http://localhost:8888/callback'

app.get('/login', function(req, res) {
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: process.env.SPOTIFY_CLIENT_ID,
      scope: 'ugc-image-upload user-read-recently-played user-read-playback-state user-top-read app-remote-control playlist-modify-public user-modify-playback-state playlist-modify-private user-follow-modify user-read-currently-playing user-follow-read user-library-modify user-read-playback-position playlist-read-private user-read-email user-read-private user-library-read playlist-read-collaborative streaming',
      redirect_uri
    }))
})

app.get('/callback', function(req, res) {
  let code = req.query.code || null
  let authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    form: {
      code: code,
      redirect_uri,
      grant_type: 'authorization_code'
    },
    headers: {
      'Authorization': 'Basic ' + (new Buffer(
        process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET
      ).toString('base64'))
    },
    json: true
  }
  request.post(authOptions, function(error, response, body) {
    var access_token = body.access_token
    let uri = process.env.FRONTEND_URI || 'http://localhost:3000'
    res.redirect(uri + '?access_token=' + access_token)
  })
})

let port = process.env.PORT || 8888
console.log(`Listening on port ${port}. Go /login to initiate authentication flow.`)
app.listen(port)

// REDIRECT_URI=https://SERVERNAME.herokuapp.com/callback
// FRONTEND_URI=https://melodient.herokuapp.com