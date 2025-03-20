import { Message } from 'discord.js';
import { Command } from '../types/Command';
import { CommandManager } from '../utils/commandManager';
import { CommandLogger } from '../utils/logger';

const helpCommand: Command = {
  name: 'help',
  aliases: ['h', 'comandos'],
  description:
    'Muestra la lista de comandos disponibles o información detallada de un comando específico',
  execute: async (message: Message, args: string[]): Promise<void> => {
    const commandManager = CommandManager.getInstance();

    // Si se proporciona un comando específico
    if (args.length > 0) {
      const commandName = args[0].toLowerCase();
      const command = commandManager.getCommand(commandName);

      if (!command) {
        const response = `❌ El comando "${commandName}" no existe. Usa \`~help\` para ver la lista de comandos disponibles.`;
        await message.reply(response);
        CommandLogger.logResponse(message, response);
        return;
      }

      const aliases = command.aliases
        ? `
**Aliases:** ${command.aliases.join(', ')}`
        : '';
      const response = `📖 **Información del comando ${command.name}:**

**Descripción:** ${command.description}${aliases}`;

      await message.reply(response);
      CommandLogger.logResponse(message, `Información del comando: ${command.name}`);
      return;
    }

    // Si no se proporciona comando específico, mostrar lista completa
    const commands = commandManager.getAllCommands();
    const commandList = commands
      .map((cmd: Command) => {
        const aliases = cmd.aliases ? ` _(Aliases: ${cmd.aliases.join(', ')})_` : '';
        return `🔹 **${cmd.name}**${aliases}: ${cmd.description}`;
      })
      .join('\n');

    const response = `📚 **Comandos disponibles:**

${commandList}

Para más información sobre un comando específico, usa \`~help <comando>\``;

    await message.reply(response);
    CommandLogger.logResponse(message, `Lista de ${commands.length} comandos disponibles`);
  },
};

export default helpCommand;
