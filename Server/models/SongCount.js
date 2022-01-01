const mongoose = require('mongoose')

const SongSchema = new mongoose.Schema({
    songName: String,
    songURI: String,
    artists: Array
})

const Song = mongoose.model('songTable', SongSchema)

module.exports = Song 