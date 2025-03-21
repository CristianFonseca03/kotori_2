import { Message } from 'discord.js';
import PingCommand from '../../src/commands/ping';
import { BaseCommand } from '../../src/types/BaseCommand';
import { createMockMessage } from '../helpers/mockDiscord';

describe('PingCommand', () => {
  let command: BaseCommand;
  let mockMessage: Message;
  const timestamp = Date.now();

  beforeEach(() => {
    command = PingCommand;
    const replyMessage = createMockMessage({
      createdTimestamp: timestamp + 100,
      valueOf: () => '',
    });
    mockMessage = createMockMessage({
      createdTimestamp: timestamp,
      reply: jest.fn().mockResolvedValue(replyMessage),
      valueOf: () => '',
    });
  });

  it('should have correct name and description', () => {
    expect(command.name).toBe('ping');
    expect(command.description).toBeDefined();
  });

  it('should first reply with "Ping..."', async () => {
    await command.execute(mockMessage);
    expect(mockMessage.reply).toHaveBeenNthCalledWith(1, 'Ping...');
  });

  it('should calculate and display latency correctly', async () => {
    await command.execute(mockMessage);
    expect(mockMessage.reply).toHaveBeenNthCalledWith(2, 'Pong! 🏓\nLatencia: 100ms');
  });

  it('should handle zero latency', async () => {
    const zeroReplyMessage = createMockMessage({
      createdTimestamp: timestamp,
      valueOf: () => '',
    });
    const zeroLatencyMessage = createMockMessage({
      createdTimestamp: timestamp,
      reply: jest.fn().mockResolvedValue(zeroReplyMessage),
      valueOf: () => '',
    });

    await command.execute(zeroLatencyMessage);
    expect(zeroLatencyMessage.reply).toHaveBeenNthCalledWith(2, 'Pong! 🏓\nLatencia: 0ms');
  });

  it('should handle high latency', async () => {
    const highReplyMessage = createMockMessage({
      createdTimestamp: timestamp + 1000,
      valueOf: () => '',
    });
    const highLatencyMessage = createMockMessage({
      createdTimestamp: timestamp,
      reply: jest.fn().mockResolvedValue(highReplyMessage),
      valueOf: () => '',
    });

    await command.execute(highLatencyMessage);
    expect(highLatencyMessage.reply).toHaveBeenNthCalledWith(2, 'Pong! 🏓\nLatencia: 1000ms');
  });
});
