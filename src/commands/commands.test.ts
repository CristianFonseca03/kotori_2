import PingCommand from './ping';
import PlayCommand from './play';
import HelpCommand from './help';
import SongsCommand from './songs';
import { Message, GuildMember, VoiceChannel } from 'discord.js';
import { createMockMessage } from '../utils/testUtils';
import { AudioManager } from '../utils/audioManager';
import { AudioPlayerManager } from '../utils/audioPlayer';
import { CommandManager } from '../utils/commandManager';

jest.mock('@discordjs/voice', () => ({
  joinVoiceChannel: jest.fn(() => ({
    subscribe: jest.fn(),
    destroy: jest.fn(),
  })),
}));

jest.mock('../utils/commandManager', () => {
  return {
    CommandManager: jest.fn().mockImplementation(() => {
      return {
        registerCommand: jest.fn(),
        getCommand: jest.fn((name: string) => {
          if (name === 'ping') return PingCommand;
          if (name === 'play') return PlayCommand;
          if (name === 'help') return HelpCommand;
          if (name === 'songs') return SongsCommand;
          return undefined;
        }),
        getAllCommands: jest.fn(() => [PingCommand, PlayCommand, HelpCommand, SongsCommand]),
        hasCommand: jest.fn((name: string) => ['ping', 'play', 'help', 'songs'].includes(name)),
      };
    }),
  };
});

jest.mock('../utils/audioManager', () => {
  return {
    AudioManager: {
      getAvailableSongs: jest.fn(() => ['audio.mp3', 'bakabakabaka.mp3', 'navidad.mp3']),
      songExists: jest.fn((songName: string) =>
        ['audio.mp3', 'bakabakabaka.mp3', 'navidad.mp3'].includes(songName)
      ),
    },
  };
});

jest.mock('../utils/audioPlayer', () => {
  return {
    AudioPlayerManager: {
      play: jest.fn(),
      stop: jest.fn(),
    },
  };
});

// Función auxiliar para inicializar el entorno de pruebas
const setupTestEnvironment = () => {
  const mockMessage = createMockMessage();
  const commandManager = new CommandManager();

  commandManager.registerCommand(PingCommand);
  commandManager.registerCommand(PlayCommand);
  commandManager.registerCommand(HelpCommand);
  commandManager.registerCommand(SongsCommand);

  return { mockMessage, commandManager };
};

describe('Command Tests', () => {
  describe('PingCommand', () => {
    it('should reply with Pong and calculate latency', async () => {
      const { mockMessage, commandManager } = setupTestEnvironment();
      const command = commandManager.getCommand('ping');

      await command?.execute(mockMessage as Message, []);

      expect(mockMessage.reply).toHaveBeenCalledWith('Ping...');
      expect(mockMessage.reply).toHaveBeenCalledWith(
        expect.stringMatching(/Pong! \u{1F3D3}\nLatencia: \d+ms/u)
      );
    });
  });

  describe('PlayCommand', () => {
    it('should reply with an error if no arguments are provided', async () => {
      const { mockMessage, commandManager } = setupTestEnvironment();
      const command = commandManager.getCommand('play');
      const args: string[] = [];

      await command?.execute(mockMessage as Message, args);

      expect(mockMessage.reply).toHaveBeenCalledWith(
        'Por favor, proporciona un archivo de audio para reproducir.'
      );
    });

    it('should reply with a success message when a valid file is provided', async () => {
      const { mockMessage, commandManager } = setupTestEnvironment();
      const command = commandManager.getCommand('play');
      const args: string[] = ['audio.mp3'];

      const mockVoiceChannel = {} as VoiceChannel;
      const mockGuildMember = {
        voice: {
          channel: mockVoiceChannel,
        },
      } as unknown as GuildMember;

      Object.defineProperty(mockMessage, 'member', { value: mockGuildMember });

      jest.spyOn(AudioManager, 'songExists').mockReturnValueOnce(true);

      await command?.execute(mockMessage as Message, args);

      expect(mockMessage.reply).toHaveBeenCalledWith('\u{1F3B5} Reproduciendo: **audio.mp3**');
      expect(AudioPlayerManager.play).toHaveBeenCalledWith(mockMessage, 'audio.mp3');
    });
  });

  describe('HelpCommand', () => {
    it('should reply with a list of available commands', async () => {
      const { mockMessage, commandManager } = setupTestEnvironment();
      const command = commandManager.getCommand('help');

      await command?.execute(mockMessage as Message, []);

      expect(mockMessage.reply).toHaveBeenCalledWith(
        expect.stringMatching(/Comandos disponibles:/)
      );
    });
  });

  describe('SongsCommand', () => {
    it('should reply with a list of available songs', async () => {
      const { mockMessage, commandManager } = setupTestEnvironment();
      const command = commandManager.getCommand('songs');

      await command?.execute(mockMessage as Message, []);

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

      const { mockMessage, commandManager } = setupTestEnvironment();
      const command = commandManager.getCommand('songs');

      await command?.execute(mockMessage as Message, []);

      expect(mockMessage.reply).toHaveBeenCalledWith('No hay canciones disponibles en el momento.');
    });
  });
});
