import { Message } from 'discord.js';
import HelpCommand from '../../src/commands/help';
import { BaseCommand } from '../../src/types/BaseCommand';
import { createMockMessage } from '../helpers/mockDiscord';

describe('HelpCommand', () => {
  let command: BaseCommand;
  let mockMessage: Message;

  beforeEach(() => {
    command = HelpCommand;
    mockMessage = createMockMessage({
      content: '~help',
      reply: jest.fn(),
    } as unknown as Partial<Message>) as Message;
  });

  it('should have correct name and description', () => {
    expect(command.name).toBe('help');
    expect(command.description).toBeDefined();
  });

  it('should reply with general help information when no command specified', async () => {
    await command.execute(mockMessage, []);
    expect(mockMessage.reply).toHaveBeenCalled();
    const reply = (mockMessage.reply as jest.Mock).mock.calls[0][0];
    expect(reply).toContain('Comandos disponibles');
  });

  it('should reply with specific command help when command is specified', async () => {
    await command.execute(mockMessage, ['ping']);
    expect(mockMessage.reply).toHaveBeenCalled();
    const reply = (mockMessage.reply as jest.Mock).mock.calls[0][0];
    expect(reply).toContain('ping');
  });

  it('should handle unknown command gracefully', async () => {
    await command.execute(mockMessage, ['unknowncommand']);
    expect(mockMessage.reply).toHaveBeenCalled();
    const reply = (mockMessage.reply as jest.Mock).mock.calls[0][0];
    expect(reply).toContain('no existe');
  });
});
