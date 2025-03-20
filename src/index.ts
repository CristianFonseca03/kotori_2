import { Client, GatewayIntentBits, Message } from 'discord.js';
import config from './config';
import pingCommand from './commands/ping';
import playCommand from './commands/play';
import songsCommand from './commands/songs';
import helpCommand from './commands/help';
import { CommandManager } from './utils/commandManager';
import { CommandLogger } from './utils/logger';

class KotoriClient extends Client {
  constructor() {
    super({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildVoiceStates,
      ],
    });
  }
}

const client = new KotoriClient();
const commandManager = CommandManager.getInstance();

// Registrar comandos
commandManager.registerCommand(pingCommand);
commandManager.registerCommand(playCommand);
commandManager.registerCommand(songsCommand);
commandManager.registerCommand(helpCommand);

client.once('ready', async (): Promise<void> => {
  await CommandLogger.logPrefix(config.prefix);
  CommandLogger.logInfo(`Bot está listo! Conectado como ${client.user?.tag}`);
});

client.on('messageCreate', async (message: Message): Promise<void> => {
  if (message.author.bot) return;

  if (!message.content.startsWith(config.prefix)) return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/);
  const commandName = args.shift()?.toLowerCase();

  if (!commandName || !commandManager.hasCommand(commandName)) return;

  try {
    const command = commandManager.getCommand(commandName);
    if (command) {
      CommandLogger.logCommand(message, command.name, args);
      await command.execute(message, args);
    }
  } catch (error) {
    if (error instanceof Error) {
      CommandLogger.logError(error);
    }
    await message.reply('Hubo un error al ejecutar ese comando!');
  }
});

client.login(config.token);
