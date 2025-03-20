import { Message } from 'discord.js';
import { BaseCommand } from '../types/BaseCommand';
import { CommandManager } from '../utils/commandManager';

class HelpCommand extends BaseCommand {
  name = 'help';
  aliases = ['h', 'comandos'];
  description =
    'Muestra la lista de comandos disponibles o información detallada de un comando específico';

  async execute(message: Message, args: string[]): Promise<void> {
    const commandManager = CommandManager.getInstance();

    // Si se proporciona un comando específico
    if (args.length > 0) {
      const commandName = args[0].toLowerCase();
      const command = commandManager.getCommand(commandName);

      if (!command) {
        const response = `❌ El comando "${commandName}" no existe. Usa \`~help\` para ver la lista de comandos disponibles.`;
        await this.logAndReply(message, response);
        return;
      }

      const aliases = command.aliases ? `\n**Aliases:** ${command.aliases.join(', ')}` : '';
      const response = `📖 **Información del comando ${command.name}:**\n\n**Descripción:** ${command.description}${aliases}`;

      await this.logAndReply(message, response);
      return;
    }

    // Si no se proporciona comando específico, mostrar lista completa
    const commands = commandManager.getAllCommands();
    const commandList = commands
      .map((cmd) => {
        const aliases = cmd.aliases ? ` _(Aliases: ${cmd.aliases.join(', ')})_` : '';
        return `🔹 **${cmd.name}**${aliases}: ${cmd.description}`;
      })
      .join('\n');

    const response = `📚 **Comandos disponibles:**\n\n${commandList}\n\nPara más información sobre un comando específico, usa \`~help <comando>\``;

    await this.logAndReply(message, response);
  }
}

export default new HelpCommand();
