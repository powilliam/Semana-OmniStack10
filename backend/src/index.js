const express = require('express')
const http = require('http')
const mongoose = require('mongoose')
const cors = require('cors')
const routes = require('./routes')

const bodyParser = express.json()

const app = express()
const server = http.Server(app)

mongoose.connect(
    'mongodb+srv://powilliam:powilliam@heaven-uc9c7.mongodb.net/test?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: true,
        useCreateIndex: true,
    },
    function GetConnectionStatus(err){
        if (err) {
            console.error(err)

            throw err
        } else {
            console.log('> Connection with MongoDB successfully')
        }
    }
)

app.use(cors())
app.use(bodyParser)
app.use(routes)

server.listen(3333, () => {
    console.log('> Listening')
})