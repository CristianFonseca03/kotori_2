import { Message } from 'discord.js';
import { BaseCommand } from '../types/BaseCommand';

class PingCommand extends BaseCommand {
  name = 'ping';
  description = 'Responde con "Pong!" y muestra la latencia del bot';

  async execute(message: Message): Promise<void> {
    const sent = await this.logAndReply(message, 'Ping...');
    const latency = sent.createdTimestamp - message.createdTimestamp;
    await this.logAndReply(message, `Pong! 🏓\nLatencia: ${latency}ms`);
  }
}

export default new PingCommand();
