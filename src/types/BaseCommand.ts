import { Message } from 'discord.js';
import { CommandLogger } from '../utils/logger';

export abstract class BaseCommand {
  abstract name: string;
  abstract description: string;
  abstract execute(message: Message, args: string[]): Promise<void>;

  protected async logAndReply(message: Message, response: string): Promise<void> {
    CommandLogger.logResponse(message, response);
    await message.reply(response);
  }
}
