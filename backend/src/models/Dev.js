const mongoose = require('mongoose')
const PointSchema = require('./utils/PointSchema')

const DevSchema = new mongoose.Schema({
    name: String,
    github: String,
    bio: String,
    avatar: String,
    techs: [String],
    location: {
        type: PointSchema,
        index: '2dsphere'
    }
})

const DevModel = mongoose.model('Devs', DevSchema)

module.exports = DevModel