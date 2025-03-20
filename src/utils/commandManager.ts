import { Collection } from 'discord.js';
import { Command } from '../types/Command';

export class CommandManager {
  private static instance: CommandManager;
  private commands: Collection<string, Command>;

  private constructor() {
    this.commands = new Collection<string, Command>();
  }

  public static getInstance(): CommandManager {
    if (!CommandManager.instance) {
      CommandManager.instance = new CommandManager();
    }
    return CommandManager.instance;
  }

  public registerCommand(command: Command): void {
    this.commands.set(command.name, command);
    if (command.aliases) {
      command.aliases.forEach((alias) => {
        this.commands.set(alias, command);
      });
    }
  }

  public getCommand(name: string): Command | undefined {
    return this.commands.get(name);
  }

  public getAllCommands(): Command[] {
    const uniqueCommands = new Set<Command>();
    this.commands.forEach((command) => {
      uniqueCommands.add(command);
    });
    return Array.from(uniqueCommands);
  }

  public hasCommand(name: string): boolean {
    return this.commands.has(name);
  }
}
