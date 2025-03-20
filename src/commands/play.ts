import { Message } from 'discord.js';
import { BaseCommand } from '../types/BaseCommand';
import { AudioPlayerManager } from '../utils/audioPlayer';
import { AudioManager } from '../utils/audioManager';

class PlayCommand extends BaseCommand {
  name = 'play';
  aliases = ['p'];
  description = 'Reproduce un archivo de audio en el canal de voz';

  async execute(message: Message, args: string[]): Promise<void> {
    if (args.length === 0) {
      const response =
        'Por favor, especifica el nombre del archivo de audio o su número. Usa `~songs` para ver la lista de canciones disponibles.';
      await this.logAndReply(message, response);
      return;
    }

    const songs = AudioManager.getAvailableSongs();
    const input = args[0];
    let audioFile: string;

    // Verificar si el input es un número
    const songNumber = parseInt(input);
    if (!isNaN(songNumber) && songNumber > 0 && songNumber <= songs.length) {
      audioFile = songs[songNumber - 1];
    } else {
      audioFile = input;
    }

    if (!AudioManager.songExists(audioFile)) {
      const response = `La canción "${input}" no existe. Usa \`~songs\` para ver la lista de canciones disponibles.`;
      await this.logAndReply(message, response);
      return;
    }

    await AudioPlayerManager.play(message, audioFile);
    const response = `Reproduciendo: ${audioFile}`;
    await this.logAndReply(message, response);
  }
}

export default new PlayCommand();
