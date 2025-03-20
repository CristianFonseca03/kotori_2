import { Message } from 'discord.js';
import { Command } from '../types/Command';
import { AudioManager } from '../utils/audioManager';
import { CommandLogger } from '../utils/logger';

const songsCommand: Command = {
  name: 'songs',
  description: 'Muestra la lista de canciones disponibles para reproducir',
  execute: async (message: Message): Promise<void> => {
    const songs = AudioManager.getAvailableSongs();

    if (songs.length === 0) {
      const response = 'No hay canciones disponibles en el momento.';
      await message.reply(response);
      CommandLogger.logResponse(message, response);
      return;
    }

    const songList = songs.map((song, index) => `${index + 1}. ${song}`).join('\n');
    const response = `🎵 **Canciones disponibles:**\n\`\`\`\n${songList}\n\`\`\`\nPara reproducir una canción, usa \`~play <nombre del archivo>\``;

    await message.reply(response);
    CommandLogger.logResponse(message, `Lista de ${songs.length} canciones disponibles`);
  },
};

export default songsCommand;
