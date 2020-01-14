const axios = require('axios')
const Devs = require('../models/Dev')

class DevController {
    async store(request, response) {
        const { github, techs, latitude, longitude } = request.body
    
        const registeredDev = await verifyIfDevIsAlreadyRegistered(github)

        if (!registeredDev) {
            console.log('> Dev isn`t registered')

            const { name = login, avatar_url, bio } = await getGithubUserData(github)
    
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude]
            }
        
            const dev = await Devs.create({
                name,
                avatar: avatar_url,
                techs: techs.split(',').map(techs => techs.trim()),
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
}

module.exports = new DevController()
