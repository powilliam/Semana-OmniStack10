import socketio from 'socket.io-client'

const socket = socketio('http://192.168.0.104:3333', {
    autoConnect: false
})

export function connect() {
    socket.connect()
}

export function disconnect() {
    socket.connected && socket.disconnect()
}