export interface MockAudioPlayer {
  play: jest.Mock;
  on: jest.Mock;
  emit: jest.Mock;
  state: { status: string };
  stop: jest.Mock;
  pause: jest.Mock;
  unpause: jest.Mock;
}

export interface MockVoiceConnection {
  subscribe: jest.Mock;
  destroy: jest.Mock;
  on: jest.Mock;
  emit: jest.Mock;
  state: { status: string };
  rejoin: jest.Mock;
}
