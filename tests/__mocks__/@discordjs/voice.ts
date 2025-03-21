import { MockAudioPlayer, MockVoiceConnection } from '../../types/mocks';

export enum AudioPlayerStatus {
  Idle = 'idle',
  Playing = 'playing',
  Paused = 'paused',
  AutoPaused = 'autopaused',
  Buffering = 'buffering',
}

export enum VoiceConnectionStatus {
  Signalling = 'signalling',
  Connecting = 'connecting',
  Ready = 'ready',
  Disconnected = 'disconnected',
  Destroyed = 'destroyed',
}

export const mockPlayer: MockAudioPlayer = {
  play: jest.fn().mockImplementation(() => {
    setTimeout(() => {
      mockPlayer.emit(
        'stateChange',
        { status: AudioPlayerStatus.Buffering },
        { status: AudioPlayerStatus.Playing }
      );
    }, 0);
  }),
  stop: jest.fn(),
  pause: jest.fn(),
  unpause: jest.fn(),
  on: jest.fn((event, callback) => {
    if (event === 'stateChange') {
      setTimeout(() => {
        callback({ status: AudioPlayerStatus.Playing }, { status: AudioPlayerStatus.Idle });
      }, 0);
    }
    return mockPlayer;
  }),
  emit: jest.fn(),
  state: {
    status: AudioPlayerStatus.Idle,
  },
};

export const mockConnection: MockVoiceConnection = {
  destroy: jest.fn(),
  subscribe: jest.fn(),
  on: jest.fn((event, callback) => {
    if (event === 'stateChange') {
      setTimeout(() => {
        callback(
          { status: VoiceConnectionStatus.Connecting },
          { status: VoiceConnectionStatus.Ready }
        );
      }, 0);
    }
    return mockConnection;
  }),
  emit: jest.fn(),
  rejoin: jest.fn(),
  state: {
    status: VoiceConnectionStatus.Ready,
  },
};

export const joinVoiceChannel = jest.fn().mockImplementation(() => mockConnection);
export const createAudioPlayer = jest.fn().mockImplementation(() => mockPlayer);
export const createAudioResource = jest
  .fn()
  .mockImplementation(() => ({ resource: 'mock-resource' }));
export const entersState = jest.fn().mockResolvedValue(true);
