const Devs = require('../models/Dev')
const parseStringToArray = require('../utils/parseStringToArray')

class SearchController {
    async index(request, response) {
        const { latitude, longitude, techs } = request.query

        const arrayTechs = parseStringToArray(techs)

        const locatedDevs = await Devs.find({
            techs: {
                $in: arrayTechs
            },
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude],
                    },
                    $maxDistance: 10000,
                },
            },
        })

        return response.json({ locatedDevs })
    }
}

module.exports = new SearchController()