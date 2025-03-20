import { Message } from 'discord.js';
import { BaseCommand } from '../types/BaseCommand';
import { AudioManager } from '../utils/audioManager';
import config from '../config';

class SongsCommand extends BaseCommand {
  name = 'songs';
  aliases = ['songlist'];
  description = 'Muestra la lista de canciones disponibles';

  async execute(message: Message): Promise<void> {
    const songs = AudioManager.getAvailableSongs();

    if (songs.length === 0) {
      const response = 'No hay canciones disponibles en el momento.';
      await this.logAndReply(message, response);
      return;
    }

    const songList = songs.map((song: string, index: number) => `${index + 1}. ${song}`).join('\n');
    const response = `🎵 **Canciones disponibles:**\n\`\`\`\n${songList}\n\`\`\`\nPara reproducir una canción, usa \`${config.prefix}play <nombre del archivo>\``;
    await this.logAndReply(message, response);
  }
}

export default new SongsCommand();
