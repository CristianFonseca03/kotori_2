import { Client, GatewayIntentBits, Collection, Message } from 'discord.js';
import config from './config';
import pingCommand from './commands/ping';
import playCommand from './commands/play';
import songsCommand from './commands/songs';
import { Command } from './types/Command';
import { CommandLogger } from './utils/logger';

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

  public registerCommand(command: Command): void {
    this.commands.set(command.name, command);
    if (command.aliases) {
      command.aliases.forEach((alias) => {
        this.commands.set(alias, command);
      });
    }
  }
}

const client = new KotoriClient();
client.registerCommand(pingCommand);
client.registerCommand(playCommand);
client.registerCommand(songsCommand);

client.once('ready', (): void => {
  CommandLogger.logInfo(`Bot está listo! Conectado como ${client.user?.tag}`);
});

client.on('messageCreate', async (message: Message): Promise<void> => {
  if (message.author.bot) return;

  if (!message.content.startsWith(config.prefix)) return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/);
  const commandName = args.shift()?.toLowerCase();

  if (!commandName || !client.commands.has(commandName)) return;

  try {
    const command = client.commands.get(commandName);
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
