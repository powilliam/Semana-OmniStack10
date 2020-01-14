const express = require('express')

const app = express()

// Route methods -> ['GET', 'POST', 'PUT', 'DELETE']

app.get('/', (request, response) => {
    return response.json({
        message: 'Hello OmniStack'
    })
})

app.listen(3333)