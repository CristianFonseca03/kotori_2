import { Message } from 'discord.js';
import { Command } from './Command';
import { CommandLogger } from '../utils/logger';

export abstract class BaseCommand implements Command {
  abstract name: string;
  abstract description: string;
  aliases?: string[];

  abstract execute(message: Message, args?: string[]): Promise<void>;

  protected async logAndReply(message: Message, response: string): Promise<Message> {
    CommandLogger.logResponse(message, response);
    return await message.reply(response);
  }
}
