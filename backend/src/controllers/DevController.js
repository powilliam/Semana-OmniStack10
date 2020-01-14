const axios = require('axios')
const Devs = require('../models/Dev')
const parseStringToArray = require('../utils/parseStringToArray')

// Challenge: Finish the CRUD with Update and Destroy methods
// To update: Bio, Techs, Name, Avatar, Location

class DevController {
    async index(request, response) {
        const allDevs = await Devs.find()

        return response.json(allDevs)
    }

    async store(request, response) {
        const { github, techs, latitude, longitude } = request.body
    
        const registeredDev = await verifyIfDevIsAlreadyRegistered(github)

        if (!registeredDev) {
            console.log('> Dev isn`t registered')

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
        } else {
            console.log('> Dev is already registered')

            return response.json(registeredDev)
        }

        async function verifyIfDevIsAlreadyRegistered(account) {
            return await Devs.findOne({ github: account })
        }
    
        async function getGithubUserData(account) {
            const response = await axios.get(
                `https://api.github.com/users/${account}`
            )
    
            return response.data
        }
    }

    async destroy(request, response) {
        const { _id } = request.params

        console.log(`> Deleting dev with id: ${_id}`)
        
        await Devs.findByIdAndDelete({ _id: _id })

        return response.status(200).json({ status: 'deleted' })
    }
}

module.exports = new DevController()
