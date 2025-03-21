import { mockPlayer, mockConnection } from './@discordjs/voice';
import { Message, GuildMember } from 'discord.js';

export const mockAudioPlayerManager = {
  play: jest.fn().mockImplementation(async (message: Message, audioFile: string) => {
    const member = message.member as GuildMember;
    if (!member?.voice.channel) {
      await message.reply('Debes estar en un canal de voz para usar este comando!');
      return;
    }

    const player = mockPlayer;
    const connection = mockConnection;

    // Configurar los event listeners
    player.on.mockImplementation((event, callback) => {
      if (event === 'stateChange') {
        callback();
      }
      return player;
    });

    connection.on.mockImplementation((event, callback) => {
      if (event === 'stateChange') {
        callback();
      }
      return connection;
    });

    connection.subscribe(player);

    // Verificar que el canal sea un tipo que soporte el método send
    const channel = message.channel;
    if ('send' in channel) {
      if (audioFile === 'error.mp3') {
        await channel.send('Hubo un error al reproducir el audio.');
      } else {
        await channel.send('¡Audio reproducido!');
      }
    }

    return Promise.resolve();
  }),

  stop: jest.fn().mockImplementation((guildId: string) => {
    const playerData = mockAudioPlayerManager.players.get(guildId);
    if (playerData) {
      playerData.connection.destroy();
      mockAudioPlayerManager.players.delete(guildId);
    }
  }),

  players: new Map(),
};
