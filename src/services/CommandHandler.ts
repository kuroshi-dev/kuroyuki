import { Client, Message } from 'discord.js';
import { commands } from '../commands/index.ts';
import { config } from '../config/index.ts';
import { Command } from '../types/index.ts';

export class CommandHandler {
    private client: Client;

    constructor(client: Client) {
        this.client = client;
    }

    public handleMessage(message: Message): void {
        if (message.author.bot) return;
        if (!message.content.startsWith(config.prefix)) return;

        const args = message.content.slice(config.prefix.length).trim().split(/ +/);
        const commandName = args.shift()?.toLowerCase();

        if (!commandName) return;

        const command = commands.get(commandName);
        if (!command) return;

        this.executeCommand(command, message, args);
    }

    private async executeCommand(command: Command, message: Message, _args: string[]): Promise<void> {
        try {
            await command.execute(message);
        } catch (error) {
            console.error(`Ошибка выполнения команды ${command.name}:`, error);
            await message.reply('❌ Произошла ошибка при выполнении команды!');
        }
    }

    public getCommands(): Map<string, Command> {
        return commands;
    }
} 