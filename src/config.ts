import dotenv from 'dotenv';

dotenv.config();

interface Config {
  token: string;
  prefix: string;
  commands: {
    ping: {
      name: string;
      description: string;
    };
  };
}

const config: Config = {
  token: process.env.DISCORD_TOKEN || '',
  prefix: '~',
  commands: {
    ping: {
      name: 'ping',
      description: 'Responde con Pong! y muestra la latencia del bot',
    },
  },
};

export default config;
