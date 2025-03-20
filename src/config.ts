import dotenv from 'dotenv';
import { Config } from './types/Config';

dotenv.config();

const config: Config = {
  token: process.env.DISCORD_TOKEN || '',
  prefix: process.env.COMMAND_PREFIX || '~',
};

export default config;
