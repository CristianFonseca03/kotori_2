import { Client, GatewayIntentBits, Collection, Message } from 'discord.js';
import config from './config';
import pingCommand from './commands/ping';
import playCommand from './commands/play';
import { Command } from './types/Command';

class KotoriClient extends Client {
  public commands: Collection<string, Command>;

  constructor() {
    super({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildVoiceStates,
      ],
    });
    this.commands = new Collection<string, Command>();
  }
}

const client = new KotoriClient();
client.commands.set(pingCommand.name, pingCommand);
client.commands.set(playCommand.name, playCommand);

client.once('ready', (): void => {
  console.log(`Bot está listo! Conectado como ${client.user?.tag}`);
});

client.on('messageCreate', async (message: Message): Promise<void> => {
  if (message.author.bot) return;

  if (!message.content.startsWith(config.prefix)) return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/);
  const commandName = args.shift()?.toLowerCase();

  if (!commandName || !client.commands.has(commandName)) return;

  try {
    await client.commands.get(commandName)?.execute(message, args);
  } catch (error) {
    console.error(error);
    await message.reply('Hubo un error al ejecutar ese comando!');
  }
});

client.login(config.token);
