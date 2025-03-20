import { Message } from 'discord.js';
import { BaseCommand } from '../types/BaseCommand';
import { AudioPlayerManager } from '../utils/audioPlayer';
import { AudioManager } from '../utils/audioManager';
import config from '../config';

class PlayCommand extends BaseCommand {
  name = 'play';
  aliases = ['p'];
  description = 'Reproduce un archivo de audio en el canal de voz';

  async execute(message: Message, args: string[]): Promise<void> {
    if (!args.length) {
      const response = `Por favor, especifica el nombre del archivo de audio o su número. Usa \`${config.prefix}songs\` para ver la lista de canciones disponibles.`;
      await this.logAndReply(message, response);
      return;
    }

    const input = args.join(' ');
    const songs = AudioManager.getAvailableSongs();
    let songToPlay: string | undefined;

    // Intentar encontrar por número
    const songNumber = parseInt(input);
    if (!isNaN(songNumber) && songNumber > 0 && songNumber <= songs.length) {
      songToPlay = songs[songNumber - 1];
    } else {
      // Intentar encontrar por nombre
      songToPlay = songs.find((song: string) => song.toLowerCase().includes(input.toLowerCase()));
    }

    if (!songToPlay) {
      const response = `La canción "${input}" no existe. Usa \`${config.prefix}songs\` para ver la lista de canciones disponibles.`;
      await this.logAndReply(message, response);
      return;
    }

    try {
      await AudioPlayerManager.play(message, songToPlay);
      await this.logAndReply(message, `🎵 Reproduciendo: **${songToPlay}**`);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
      await this.logAndReply(message, `❌ Error al reproducir la canción: ${errorMessage}`);
    }
  }
}

export default new PlayCommand();
