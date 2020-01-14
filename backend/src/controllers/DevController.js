const axios = require('axios')
const Devs = require('../models/Dev')

class DevController {
    async store(request, response) {
        const { github, techs, latitude, longitude } = request.body
    
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
    
        async function getGithubUserData(account) {
            const response = await axios.get(
                `https://api.github.com/users/${account}`
            )
    
            return response.data
        }
    }
}

module.exports = new DevController()
