import { VoiceConnection, AudioPlayer } from '@discordjs/voice';

export interface PlayerData {
  connection: VoiceConnection;
  player: AudioPlayer;
}
