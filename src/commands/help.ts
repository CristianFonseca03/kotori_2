import { Message } from 'discord.js';
import { BaseCommand } from '../types/BaseCommand';
import { CommandManager } from '../utils/commandManager';
import config from '../config';

class HelpCommand extends BaseCommand {
  name = 'help';
  aliases = ['h'];
  description =
    'Muestra la lista de comandos disponibles o información detallada de un comando específico';

  async execute(message: Message, args: string[]): Promise<void> {
    const commandName = args[0]?.toLowerCase();
    const commandManager = new CommandManager(); // Crear instancia de CommandManager
    const commands = commandManager.getAllCommands();

    if (commandName) {
      const command = commands.find(
        (cmd: { name: string; aliases?: string[] }) =>
          cmd.name.toLowerCase() === commandName ||
          cmd.aliases?.some((alias: string) => alias.toLowerCase() === commandName)
      );

      if (!command) {
        const response = `❌ El comando "${commandName}" no existe. Usa \`${config.prefix}help\` para ver la lista de comandos disponibles.`;
        await this.logAndReply(message, response);
        return;
      }

      const aliasesText = command.aliases?.length
        ? `\n**Aliases:** ${command.aliases.map((alias: string) => `\`${config.prefix}${alias}\``).join(', ')}`
        : '';

      const response = `📚 **Comando:** \`${config.prefix}${command.name}\`${aliasesText}\n\n**Descripción:** ${command.description}`;
      await this.logAndReply(message, response);
      return;
    }

    const commandList = commands
      .map(
        (cmd: { name: string; description: string }) =>
          `\`${config.prefix}${cmd.name}\` - ${cmd.description}`
      )
      .join('\n');

    const response = `📚 **Comandos disponibles:**\n\n${commandList}\n\nPara más información sobre un comando específico, usa \`${config.prefix}help <comando>\``;
    await this.logAndReply(message, response);
  }
}

export default new HelpCommand();
