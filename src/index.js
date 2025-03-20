const { Client, GatewayIntentBits, Collection } = require('discord.js');
const config = require('./config');
const pingCommand = require('./commands/ping');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.commands = new Collection();
client.commands.set(pingCommand.name, pingCommand);

client.once('ready', () => {
    console.log(`Bot está listo! Conectado como ${client.user.tag}`);
});

client.on('messageCreate', message => {
    if (message.author.bot) return;

    if (!message.content.startsWith(config.prefix)) return;

    const args = message.content.slice(config.prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    if (!client.commands.has(commandName)) return;

    try {
        client.commands.get(commandName).execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply('Hubo un error al ejecutar ese comando!');
    }
});

client.login(config.token); 