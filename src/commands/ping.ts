import { Message } from 'discord.js';
import { BaseCommand } from '../types/BaseCommand';

class PingCommand extends BaseCommand {
  name = 'ping';
  description = 'Responde con Pong! y muestra la latencia del bot';

  async execute(message: Message): Promise<void> {
    const startTime = Date.now();
    const endTime = Date.now();
    const latency = endTime - startTime;
    const response = `Pong! 🏓 Latencia: ${latency}ms`;
    await this.logAndReply(message, response);
  }
}

export default new PingCommand();
