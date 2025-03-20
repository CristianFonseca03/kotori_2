import {
  joinVoiceChannel,
  createAudioPlayer,
  createAudioResource,
  AudioPlayerStatus,
  VoiceConnectionStatus,
  entersState,
  AudioPlayer,
  DiscordGatewayAdapterCreator,
} from '@discordjs/voice';
import { Message, GuildMember, TextChannel } from 'discord.js';
import { join } from 'path';
import { PlayerData } from '../types/PlayerData';

export class AudioPlayerManager {
  private static players: Map<string, PlayerData> = new Map();

  public static async play(message: Message, audioFile: string): Promise<void> {
    try {
      const member = message.member as GuildMember;
      if (!member?.voice.channel) {
        await message.reply('Debes estar en un canal de voz para usar este comando!');
        return;
      }

      const connection = joinVoiceChannel({
        channelId: member.voice.channel.id,
        guildId: message.guild?.id as string,
        adapterCreator: message.guild?.voiceAdapterCreator as DiscordGatewayAdapterCreator,
      });

      const player = createAudioPlayer();
      const resource = createAudioResource(join(__dirname, '../assets/audio', audioFile));

      connection.subscribe(player);
      player.play(resource);

      this.players.set(message.guild?.id as string, {
        connection,
        player,
      });

      player.on(AudioPlayerStatus.Idle, () => {
        if (message.channel instanceof TextChannel) {
          message.channel.send('¡Audio reproducido!');
        }
        connection.destroy();
        this.players.delete(message.guild?.id as string);
      });

      player.on('error', (error: Error) => {
        console.error(error);
        if (message.channel instanceof TextChannel) {
          message.channel.send('Hubo un error al reproducir el audio.');
        }
        connection.destroy();
        this.players.delete(message.guild?.id as string);
      });

      connection.on(VoiceConnectionStatus.Disconnected, async () => {
        try {
          await Promise.race([
            entersState(connection, VoiceConnectionStatus.Signalling, 5_000),
            entersState(connection, VoiceConnectionStatus.Connecting, 5_000),
          ]);
        } catch (error) {
          connection.destroy();
          this.players.delete(message.guild?.id as string);
        }
      });
    } catch (error) {
      console.error(error);
      await message.reply('Hubo un error al reproducir el audio.');
    }
  }

  public static stop(guildId: string): void {
    const playerData = this.players.get(guildId);
    if (playerData) {
      playerData.connection.destroy();
      this.players.delete(guildId);
    }
  }
}

export { AudioPlayer };
