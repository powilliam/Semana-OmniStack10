const Devs = require('../models/Dev')
const parseStringToArray = require('../utils/parseStringToArray')
const getGithubUserData = require('../utils/getGithubUserData')

class DevController {
    async index(request, response) {
        const allDevs = await Devs.find()

        return response.json(allDevs)
    }

    async store(request, response) {
        const { github, techs, latitude, longitude } = request.body

        console.log(`> Creating new dev with github account: ${github}`)

        const { name = login, avatar_url, bio } = await getGithubUserData(github)

        const arrayTechs = parseStringToArray(techs)

        const location = {
            type: 'Point',
            coordinates: [longitude, latitude]
        }
    
        const dev = await Devs.create({
            name,
            avatar: avatar_url,
            techs: arrayTechs,
            github,
            bio,
            location
        })
    
        return response.json(dev)
    }

    async update(request, response) {
        const { _id } = request.params
        const { github, techs, latitude, longitude } = request.body

        console.log(`> Updating dev information registered with github account: ${github}`)

        const { bio, avatar_url } = await getGithubUserData(github)

        const arrayTechs = parseStringToArray(techs)

        const location = {
            type: 'Point',
            coordinates: [longitude, latitude]
        }

        const dev = await Devs.findByIdAndUpdate({ _id }, {
            bio,
            location,
            avatar: avatar_url,
            techs: arrayTechs
        }, {
            new: true
        })

        return response.json(dev)
    }

    async destroy(request, response) {
        const { _id } = request.params

        console.log(`> Deleting dev with id account: ${_id}`)
        
        try {
            await Devs.findByIdAndDelete({ _id: _id })
        } catch (error) {
            return response.status(404).json({ error })
        }

        console.log(`> Dev deleted`)
        return response.json({ status: 'deleted' })
    }
}

module.exports = new DevController()
