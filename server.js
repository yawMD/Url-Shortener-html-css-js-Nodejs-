const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const cors = require("cors")

   // instatiate the express app  
   const app = express()
   app.use(cors())

   mongoose.connect('mongodb://127.0.0.1:27017/urlshortener', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('connected'))
.catch(() => console.log('connection failed'))

app.use(express.json({
    extended: false
})) //parse incoming request body in JSON format.

const publicDirectoryPath = path.join(__dirname, '/public')

app.use(express.static(publicDirectoryPath))


app.use("/", require("./src/routes/redirect"))
app.use('/api/url', require('./src/routes/url'))

   const PORT = process.env.PORT || 5000
   // Listen for incoming requests
   app.listen(PORT, () => console.log(`server started, listening PORT ${PORT}`))