require('dotenv').config();

module.exports = {
    token: process.env.DISCORD_TOKEN,
    prefix: '~',
    commands: {
        ping: {
            name: 'ping',
            description: 'Responde con Pong! y muestra la latencia del bot'
        }
    }
}; 