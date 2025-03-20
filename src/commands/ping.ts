import { Message } from 'discord.js';
import { Command } from '../types/Command';
import { CommandLogger } from '../utils/logger';

const pingCommand: Command = {
  name: 'ping',
  description: 'Responde con Pong! y muestra la latencia del bot',
  execute: async (message: Message): Promise<void> => {
    const startTime = Date.now();

    const reply = await message.reply('Ping...');
    const endTime = Date.now();
    const latency = endTime - startTime;
    const response = `Pong! 🏓 Latencia: ${latency}ms`;
    await reply.edit(response);

    CommandLogger.logResponse(message, response);
  },
};

export default pingCommand;
