import { Message } from 'discord.js';
import { Command } from '../types/Command';
import { AudioPlayerManager } from '../utils/audioPlayer';

const playCommand: Command = {
  name: 'play',
  description: 'Reproduce un archivo de audio en el canal de voz',
  execute: async (message: Message, args: string[]): Promise<void> => {
    if (args.length === 0) {
      await message.reply('Por favor, especifica el nombre del archivo de audio.');
      return;
    }

    const audioFile = args[0];
    await AudioPlayerManager.play(message, audioFile);
  },
};

export default playCommand;
