const mongoose = require('mongoose')
// const validator = require("validator")
//
mongoose.connect('mongodb://127.0.0.1:27017/urlshortener', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const connection = mongoose.connection

// export the connection object
module.exports = connection


