import { Message } from 'discord.js';
import fs from 'fs';
import path from 'path';

export class CommandLogger {
  private static logFile = path.join(process.cwd(), 'history.log');
  private static colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    dim: '\x1b[2m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    white: '\x1b[37m',
  };

  public static logCommand(message: Message, commandName: string, args: string[]): void {
    const timestamp = new Date().toLocaleString();
    const username = message.author.tag;
    const commandWithArgs = `${commandName} ${args.join(' ')}`.trim();

    // Formato para el archivo de log
    const logEntry = `[${timestamp}] ${username} ejecutó: ${commandWithArgs}\n`;
    fs.appendFileSync(this.logFile, logEntry);

    // Formato para la terminal
    const terminalEntry = [
      `${this.colors.dim}[${timestamp}]${this.colors.reset}`,
      `${this.colors.cyan}${username}${this.colors.reset}`,
      `${this.colors.yellow}${commandName}${this.colors.reset}`,
      args.length > 0 ? `${this.colors.magenta}${args.join(' ')}${this.colors.reset}` : '',
    ]
      .filter(Boolean)
      .join(' ');

    console.log(terminalEntry);
  }

  public static logError(error: Error): void {
    const timestamp = new Date().toLocaleString();
    const errorMessage = `[${timestamp}] ERROR: ${error.message}\n`;

    // Log en archivo
    fs.appendFileSync(this.logFile, errorMessage);

    // Log en terminal
    console.log(
      `${this.colors.dim}[${timestamp}]${this.colors.reset} ${this.colors.red}ERROR:${this.colors.reset} ${error.message}`
    );
  }

  public static logInfo(message: string): void {
    const timestamp = new Date().toLocaleString();
    const infoMessage = `[${timestamp}] INFO: ${message}\n`;

    // Log en archivo
    fs.appendFileSync(this.logFile, infoMessage);

    // Log en terminal
    console.log(
      `${this.colors.dim}[${timestamp}]${this.colors.reset} ${this.colors.blue}INFO:${this.colors.reset} ${message}`
    );
  }
}
