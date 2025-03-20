jest.mock('./audioPlayer', () => ({
  AudioPlayerManager: {
    play: jest.fn(),
    stop: jest.fn(),
  },
}));

import { AudioPlayerManager } from './audioPlayer';
import { Message } from 'discord.js';

jest.mock('@discordjs/voice', () => ({
  joinVoiceChannel: jest.fn(() => ({
    subscribe: jest.fn(),
    destroy: jest.fn(),
  })),
  createAudioPlayer: jest.fn(() => ({
    play: jest.fn(),
    on: jest.fn((event, callback) => {
      if (event === 'idle') {
        callback();
      }
    }),
  })),
  createAudioResource: jest.fn(),
}));

describe('AudioPlayerManager', () => {
  let mockMessage: Message;

  beforeEach(() => {
    mockMessage = {
      member: {
        voice: {
          channel: {
            id: 'mockChannelId',
          },
        },
      },
      guild: {
        id: 'mockGuildId',
        voiceAdapterCreator: jest.fn(),
      },
      reply: jest.fn(),
    } as unknown as Message;

    jest.clearAllMocks();
  });

  describe('play', () => {
    it('should call play with correct parameters', async () => {
      const playMock = jest.spyOn(AudioPlayerManager, 'play');

      await AudioPlayerManager.play(mockMessage, 'mockAudioFile.mp3');

      expect(playMock).toHaveBeenCalledWith(mockMessage, 'mockAudioFile.mp3');
    });

    it('should handle errors during audio playback', async () => {
      jest.spyOn(AudioPlayerManager, 'play').mockRejectedValue(new Error('Playback error'));

      await expect(AudioPlayerManager.play(mockMessage, 'mockAudioFile.mp3')).rejects.toThrow(
        'Playback error'
      );
    });

    it('should send a message if the user is not in a voice channel', async () => {
      if (mockMessage.member && mockMessage.member.voice) {
        Object.defineProperty(mockMessage.member.voice, 'channel', {
          value: null,
          writable: true,
        });
      }

      jest.spyOn(AudioPlayerManager, 'play').mockImplementation(async (message) => {
        if (!message.member?.voice.channel) {
          await message.reply('Debes estar en un canal de voz para usar este comando!');
          return;
        }
      });

      await AudioPlayerManager.play(mockMessage, 'mockAudioFile.mp3');

      expect(mockMessage.reply).toHaveBeenCalledWith(
        'Debes estar en un canal de voz para usar este comando!'
      );
    });
  });
});
