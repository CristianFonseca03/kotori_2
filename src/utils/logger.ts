import { Message } from 'discord.js';
import fs from 'fs';
import path from 'path';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const chalk = require('chalk');

export class CommandLogger {
  private static logFile = path.join(process.cwd(), 'history.log');

  public static logCommand(message: Message, commandName: string, args: string[]): void {
    const timestamp = new Date().toLocaleString();
    const username = message.author.tag;
    const commandWithArgs = `${commandName} ${args.join(' ')}`.trim();

    // Formato para el archivo de log
    const logEntry = `[${timestamp}] ${username} ejecutó: ${commandWithArgs}\n`;
    fs.appendFileSync(this.logFile, logEntry);

    // Formato para la terminal
    const terminalEntry = [
      `${chalk.default.dim(`[${timestamp}]`)} ${chalk.default.magenta(username)} ${chalk.default.yellow(commandName)}`,
      args.length > 0 ? `${chalk.default.magenta(args.join(' '))}` : '',
    ]
      .filter(Boolean)
      .join(' ');

    console.log(terminalEntry);
  }

  public static logResponse(message: Message, response: string): void {
    const timestamp = new Date().toLocaleString();
    const username = message.author.tag;

    // Formato para el archivo de log
    const logEntry = `[${timestamp}] Respuesta a ${username}: ${response}\n`;
    fs.appendFileSync(this.logFile, logEntry);

    // Formato para la terminal
    const terminalEntry = [
      `${chalk.default.dim(`[${timestamp}]`)} ${chalk.default.green(`Respuesta a ${username}:`)} ${chalk.default.white(response)}`,
    ].join(' ');

    console.log(terminalEntry);
  }

  public static logError(error: Error): void {
    const timestamp = new Date().toLocaleString();
    const errorMessage = `[${timestamp}] ERROR: ${error.message}\n`;

    // Log en archivo
    fs.appendFileSync(this.logFile, errorMessage);

    // Log en terminal
    console.log(
      `${chalk.default.dim(`[${timestamp}]`)} ${chalk.default.bgRed.black('ERROR:')} ${error.message}`
    );
  }

  public static logInfo(message: string): void {
    const timestamp = new Date().toLocaleString();
    const infoMessage = `[${timestamp}] INFO: ${message}\n`;

    // Log en archivo
    fs.appendFileSync(this.logFile, infoMessage);

    // Log en terminal
    console.log(
      `${chalk.default.dim(`[${timestamp}]`)} ${chalk.default.bgBlue.black('INFO:')} ${message}`
    );
  }

  public static async logPrefix(prefix: string): Promise<void> {
    const timestamp = new Date().toLocaleString();
    console.log(
      `${chalk.default.dim(`[${timestamp}]`)} ${chalk.default.bgGreen.black(`Prefijo: ${prefix}`)}`
    );
  }
}
