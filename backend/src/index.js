const express = require('express')
const mongoose = require('mongoose')
const routes = require('./routes')

const bodyParser = express.json()

const app = express()

mongoose.connect(
    'mongodb+srv://powilliam:powilliam@heaven-uc9c7.mongodb.net/test?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    err => {
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

// HTTP methods -> ['GET', 'POST', 'PUT', 'DELETE']

/** Params types:
 * 
 * Query -> for search generally used by GET
 * Route -> for perform an action in a specific register, generally used by PUT and DELETE.
 * Body -> for create or change a register, generally used by POST and PUT
 */

app.listen(3333)