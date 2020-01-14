const axios = require('axios')

module.exports = async function getGithubUserData(account) {
    const response = await axios.get(
        `https://api.github.com/users/${account}`
    )

    return response.data
}