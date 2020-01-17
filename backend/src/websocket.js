const socketio = require('socket.io')
const parseStringToArray = require('./utils/parseStringToArray')

const connections = []

exports.setupWebsocket = (server) => {
    const io = socketio(server)

    io.on('connection', socket => {
        console.log(socket.id)
        const { latitude, longitude, techs } = socket.handshake.query

        connections.push({
            id: socket.id,
            coordinates: {
                latitude: Number(latitude),
                longitude: Number(longitude)
            },
            techs: parseStringToArray(techs)
        })
    })
}