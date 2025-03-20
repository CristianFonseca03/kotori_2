import { Message, User } from 'discord.js';

export const createMockMessage = (): Partial<Message> => {
  return {
    createdTimestamp: Date.now(),
    reply: jest.fn().mockResolvedValue({ createdTimestamp: Date.now(), valueOf: (): string => '' }),
    author: {
      tag: 'TestUser#1234',
    } as User,
  } as unknown as Partial<Message>;
};
