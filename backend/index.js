const express = require('express')
const bodyParser = express.json()

const app = express()
app.use(bodyParser)

// HTTP methods -> ['GET', 'POST', 'PUT', 'DELETE']

/** Params types:
 * 
 * Query -> for search generally used by GET
 * Route -> for perform an action in a specific register, generally used by PUT and DELETE.
 * Body -> for create or change a register, generally used by POST and PUT
 */

app.post('/', (request, response) => {
    console.log(request.body)
    return response.json({
        message: 'Hello OmniStack'
    })
})

app.listen(3333)