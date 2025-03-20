import { Message } from 'discord.js';
import { Command } from '../types/Command';

const pingCommand: Command = {
  name: 'ping',
  description: 'Responde con Pong! y muestra la latencia del bot',
  execute: async (message: Message): Promise<void> => {
    const startTime = Date.now();
    
    const reply = await message.reply('Ping...');
    const endTime = Date.now();
    const latency = endTime - startTime;
    await reply.edit(`Pong! 🏓 Latencia: ${latency}ms`);
  }
};

export default pingCommand; 