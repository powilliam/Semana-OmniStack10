const express = require('express')
const mongoose = require('mongoose')
const routes = require('./routes')

const bodyParser = express.json()

const app = express()

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

app.use(bodyParser)
app.use(routes)

app.listen(3333, () => {
    console.log('> Listening')
})