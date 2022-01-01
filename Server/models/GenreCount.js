const mongoose = require('mongoose')

const GenreSchema = new mongoose.Schema({
    _genreName: {
        type: 'string',
        required: true
    },
    // genreCount: {
    //     type: Number,
    //     default: 0
    // }
})

const Genre = mongoose.model('genreCounter', GenreSchema)

module.exports = Genre 