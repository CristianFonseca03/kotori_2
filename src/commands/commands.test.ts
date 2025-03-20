import PingCommand from './ping';
import PlayCommand from './play';
import HelpCommand from './help';
import SongsCommand from './songs';
import { Message, GuildMember, VoiceChannel } from 'discord.js';
import { createMockMessage } from '../utils/testUtils';
import { AudioManager } from '../utils/audioManager';
import { AudioPlayerManager } from '../utils/audioPlayer';

jest.mock('@discordjs/voice', () => ({
  joinVoiceChannel: jest.fn(() => ({
    subscribe: jest.fn(),
    destroy: jest.fn(),
  })),
}));

jest.mock('../utils/audioManager', () => ({
  AudioManager: {
    getAvailableSongs: jest.fn(() => ['audio.mp3', 'bakabakabaka.mp3', 'navidad.mp3']),
    songExists: jest.fn((songName: string) =>
      ['audio.mp3', 'bakabakabaka.mp3', 'navidad.mp3'].includes(songName)
    ),
  },
}));

jest.mock('../utils/audioPlayer', () => ({
  AudioPlayerManager: {
    play: jest.fn(),
  },
}));

describe('Command Tests', () => {
  let mockMessage: Partial<Message>;

  beforeEach(() => {
    mockMessage = createMockMessage();
  });

  describe('PingCommand', () => {
    it('should reply with Pong and calculate latency', async () => {
      const command = PingCommand;
      await command.execute(mockMessage as Message);

      expect(mockMessage.reply).toHaveBeenCalledWith('Ping...');
      expect(mockMessage.reply).toHaveBeenCalledWith(
        expect.stringMatching(/Pong! 🏓\nLatencia: \d+ms/)
      );
    });
  });

  describe('PlayCommand', () => {
    it('should reply with an error if no arguments are provided', async () => {
      const command = PlayCommand;
      const args: string[] = [];

      await command.execute(mockMessage as Message, args);

      expect(mockMessage.reply).toHaveBeenCalledWith(
        'Por favor, proporciona un archivo de audio para reproducir.'
      );
    });

    it('should reply with a success message when a valid file is provided', async () => {
      const command = PlayCommand;
      const args: string[] = ['audio.mp3'];

      const mockVoiceChannel = {} as VoiceChannel;
      const mockGuildMember = {
        voice: {
          channel: mockVoiceChannel,
        },
      } as unknown as GuildMember;

      Object.defineProperty(mockMessage, 'member', { value: mockGuildMember });

      await command.execute(mockMessage as Message, args);

      expect(mockMessage.reply).toHaveBeenCalledWith('🎵 Reproduciendo: **audio.mp3**');
      expect(AudioPlayerManager.play).toHaveBeenCalledWith(mockMessage, 'audio.mp3');
    });
  });

  describe('HelpCommand', () => {
    it('should reply with a list of available commands', async () => {
      const command = HelpCommand;
      const args: string[] = [];

      await command.execute(mockMessage as Message, args);

      expect(mockMessage.reply).toHaveBeenCalledWith(
        expect.stringMatching(/Comandos disponibles:/)
      );
    });
  });

  describe('SongsCommand', () => {
    it('should reply with a list of available songs', async () => {
      const command = SongsCommand;

      await command.execute(mockMessage as Message);

      expect(mockMessage.reply).toHaveBeenCalledWith(
        expect.stringMatching(/Canciones disponibles:/)
      );
      expect(mockMessage.reply).toHaveBeenCalledWith(expect.stringMatching(/1\. audio\.mp3/));
      expect(mockMessage.reply).toHaveBeenCalledWith(
        expect.stringMatching(/2\. bakabakabaka\.mp3/)
      );
      expect(mockMessage.reply).toHaveBeenCalledWith(expect.stringMatching(/3\. navidad\.mp3/));
    });

    it('should reply with no songs available if the list is empty', async () => {
      jest.spyOn(AudioManager, 'getAvailableSongs').mockReturnValueOnce([]);

      const command = SongsCommand;

      await command.execute(mockMessage as Message);

      expect(mockMessage.reply).toHaveBeenCalledWith('No hay canciones disponibles en el momento.');
    });
  });
});
