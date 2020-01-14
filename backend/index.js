const express = require('express')

const app = express()

// HTTP methods -> ['GET', 'POST', 'PUT', 'DELETE']

/** Params types:
 * 
 * Query -> for search generally used by GET
 * Route -> for perform an action in a specific register, generally used by PUT and DELETE.
 * Body -> for create or change a register, generraly used by POST and PUT
 */

app.get('/', (request, response) => {
    return response.json({
        message: 'Hello OmniStack'
    })
})

app.listen(3333)