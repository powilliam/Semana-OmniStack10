const mongoose = require('mongoose')

const DevSchema = new mongoose.Schema({
    name: String,
    github: String,
    bio: String,
    avatar: String,
    techs: [String]
})

const DevModel = mongoose.model('Devs', DevSchema)

module.exports = DevModel