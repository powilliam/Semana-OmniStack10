const { Router } = require('express')

const DevController = require('./controllers/DevController')
const SearchController = require('./controllers/SearchController')

const routes = Router()

routes.get('/search', SearchController.index)

routes.get('/devs', DevController.index)
routes.post('/devs/register', DevController.store)
routes.delete('/devs/:_id/unregister', DevController.destroy)

module.exports = routes

// HTTP methods -> ['GET', 'POST', 'PUT', 'DELETE']

/** Params types:
 * 
 * Query -> for search generally used by GET
 * Route -> for perform an action in a specific register, generally used by PUT and DELETE.
 * Body -> for create or change a register, generally used by POST and PUT
 */