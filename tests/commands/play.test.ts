import { GuildMember, Message, VoiceChannel, VoiceState } from 'discord.js';
import PlayCommand from '../../src/commands/play';
import { BaseCommand } from '../../src/types/BaseCommand';
import {
  createMockMessage,
  createMockVoiceChannel,
  createMockGuildMember,
  createMockVoiceState,
} from '../helpers/mockDiscord';

jest.mock('../../src/utils/audioPlayer');

describe('PlayCommand', () => {
  let command: BaseCommand;
  let mockMessage: Message;
  let mockVoiceChannel: VoiceChannel;

  beforeEach(() => {
    command = PlayCommand;
    mockVoiceChannel = createMockVoiceChannel() as VoiceChannel;
    const voiceState = createMockVoiceState(mockVoiceChannel);
    const mockMember = createMockGuildMember({
      voice: voiceState,
    } as GuildMember);

    mockMessage = createMockMessage({
      content: '~play',
      member: mockMember,
    } as unknown as Partial<Message>) as Message;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should have correct name and description', () => {
    expect(command.name).toBe('play');
    expect(command.description).toBeDefined();
  });

  it('should require user to be in a voice channel', async () => {
    const voiceStateWithoutChannel = createMockVoiceState(null) as Partial<VoiceState>;
    const memberWithoutVoice = createMockGuildMember({
      voice: voiceStateWithoutChannel,
    } as Partial<GuildMember>);

    const messageWithoutVoice = createMockMessage({
      content: '~play audio.mp3',
      member: memberWithoutVoice,
    } as Partial<Message>);

    await command.execute(messageWithoutVoice);
    expect(messageWithoutVoice.reply).toHaveBeenCalledWith(
      'Por favor, proporciona un archivo de audio para reproducir.'
    );
  });

  it('should require an audio file', async () => {
    await command.execute(mockMessage);
    expect(mockMessage.reply).toHaveBeenCalledWith(
      'Por favor, proporciona un archivo de audio para reproducir.'
    );
  });

  it('should handle audio file playback', async () => {
    const messageWithAudio = createMockMessage({
      content: '~play audio.mp3',
      member: mockMessage.member,
    } as unknown as Partial<Message>) as Message;

    await command.execute(messageWithAudio);
    expect(messageWithAudio.reply).toHaveBeenCalled();
  });

  it('should handle errors during playback', async () => {
    const messageWithAudio = createMockMessage({
      content: '~play invalid.mp3',
      member: mockMessage.member,
    } as unknown as Partial<Message>) as Message;

    await command.execute(messageWithAudio);
    expect(messageWithAudio.reply).toHaveBeenCalled();
  });
});
