import { mockAudioPlayerManager } from '../__mocks__/audioPlayer';
jest.mock('../../src/utils/audioPlayer', () => ({
  AudioPlayerManager: mockAudioPlayerManager,
}));

import { AudioPlayerManager } from '../../src/utils/audioPlayer';
import { Message, GuildMember, TextChannel, VoiceState } from 'discord.js';
import {
  createMockMessage,
  createMockGuildMember,
  createMockVoiceState,
  createMockVoiceChannel,
} from '../helpers/mockDiscord';
import {
  AudioPlayerStatus,
  VoiceConnectionStatus,
  mockPlayer,
  mockConnection,
} from '../__mocks__/@discordjs/voice';

describe('AudioPlayerManager', () => {
  let mockMessage: Message;
  let mockVoiceState: VoiceState;
  let mockMember: GuildMember;
  let mockChannelSend: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    mockAudioPlayerManager.players.clear();

    const mockVoiceChannel = createMockVoiceChannel();
    mockVoiceState = createMockVoiceState(mockVoiceChannel) as VoiceState;
    mockMember = createMockGuildMember();
    mockChannelSend = jest.fn().mockResolvedValue(undefined);

    Object.defineProperty(mockMember, 'voice', {
      value: mockVoiceState,
      configurable: true,
    });

    mockMessage = createMockMessage({
      member: mockMember,
      guild: {
        id: 'mockGuildId',
        voiceAdapterCreator: jest.fn(),
      },
      channel: {
        id: 'mockChannelId',
        send: mockChannelSend,
        type: 0,
      } as unknown as TextChannel,
      reply: jest.fn(),
    } as unknown as Partial<Message>);

    // Configurar mock del player y connection
    mockPlayer.on.mockImplementation((event, handler) => {
      if (event === 'stateChange') {
        setTimeout(() => {
          handler({ status: AudioPlayerStatus.Buffering }, { status: AudioPlayerStatus.Playing });
        }, 0);
      }
      return mockPlayer;
    });

    mockConnection.on.mockImplementation((event, handler) => {
      if (event === 'stateChange') {
        setTimeout(() => {
          handler(
            { status: VoiceConnectionStatus.Connecting },
            { status: VoiceConnectionStatus.Ready }
          );
        }, 0);
      }
      return mockConnection;
    });
  });

  describe('play', () => {
    it('debería reproducir audio cuando el usuario está en un canal de voz', async () => {
      await AudioPlayerManager.play(mockMessage, 'audio.mp3');

      expect(mockMessage.reply).not.toHaveBeenCalled();
      expect(mockChannelSend).toHaveBeenCalledWith('¡Audio reproducido!');
    });

    it('debería requerir que el usuario esté en un canal de voz', async () => {
      const voiceStateWithoutChannel = createMockVoiceState(null) as VoiceState;
      const memberWithoutVoice = createMockGuildMember();
      Object.defineProperty(memberWithoutVoice, 'voice', {
        value: voiceStateWithoutChannel,
        configurable: true,
      });

      const messageWithoutVoice = createMockMessage({
        member: memberWithoutVoice,
        reply: jest.fn(),
      } as unknown as Partial<Message>);

      await AudioPlayerManager.play(messageWithoutVoice, 'audio.mp3');

      expect(messageWithoutVoice.reply).toHaveBeenCalledWith(
        'Debes estar en un canal de voz para usar este comando!'
      );
    });

    it('debería manejar errores de reproducción', async () => {
      await AudioPlayerManager.play(mockMessage, 'error.mp3');

      expect(mockChannelSend).toHaveBeenCalledWith('Hubo un error al reproducir el audio.');
    });
  });

  describe('stop', () => {
    it('debería detener la reproducción y destruir la conexión', () => {
      const guildId = 'mockGuildId';
      mockAudioPlayerManager.players.set(guildId, {
        connection: mockConnection,
        player: mockPlayer,
      });

      AudioPlayerManager.stop(guildId);

      expect(mockConnection.destroy).toHaveBeenCalled();
      expect(mockAudioPlayerManager.players.has(guildId)).toBeFalsy();
    });

    it('no debería hacer nada si no existe reproductor para el servidor', () => {
      AudioPlayerManager.stop('nonexistentGuildId');
      expect(mockAudioPlayerManager.players.size).toBe(0);
    });
  });
});
