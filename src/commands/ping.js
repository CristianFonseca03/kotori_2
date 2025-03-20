module.exports = {
    name: 'ping',
    description: 'Responde con Pong! y muestra la latencia del bot',
    execute(message) {
        const startTime = Date.now();
        
        message.reply('Ping...').then(reply => {
            const endTime = Date.now();
            const latency = endTime - startTime;
            reply.edit(`Pong! 🏓 Latencia: ${latency}ms`);
        });
    }
}; 