const Devs = require('../models/Dev')
const getGithubUserData = require('../utils/getGithubUserData')

class DevMiddleware {
    async RegisterVerification(request, response, next) {
        const { github } = request.body

        console.log(`> Verifying if dev is already registered with github account: ${github}`)

        const registeredDev = await verifyIfDevIsAlreadyRegistered(github)

        if (registeredDev) {
            console.log(`> A dev is already registered with github account: ${github}`)
            return response.json(registeredDev)
        } else {
            next()
        }

        async function verifyIfDevIsAlreadyRegistered(account) {
            return await Devs.findOne({ github: account })
        }
    }

    async GithubVerification(request, response, next) {
        const { github } = request.body

        console.log(`> Verifying github account: ${github}`)

        try {
            await getGithubUserData(github)
        } catch (error) {
            console.log(`> Invalid github account: ${github}`)
            return response.status(400).json({ error: 'Github account not found' })
        }

        console.log(`> Accepted github account: ${github}`)
        next()
    }
}

module.exports = new DevMiddleware()