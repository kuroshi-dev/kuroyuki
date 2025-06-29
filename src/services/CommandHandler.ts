import { Client, Message } from 'discord.js';
import { commands } from '../textCommands/index.ts';
import { config } from '../config/index.ts';
import { ITextCommand, ITextCommandHandler } from '../types/index.ts';

export class CommandHandler implements ITextCommandHandler {
    private client: Client;
    private commands: Map<string, ITextCommand>;

    constructor(client: Client) {
        this.client = client;
        this.commands = new Map();
        this.loadCommands();
    }

    private loadCommands(): void {

        console.log(`📦 Загружено ${commands.size} текстовых команд.`);
        commands.forEach((command, name) => {
            this.commands.set(name, command);
        });
    }

    public registerCommand(command: ITextCommand): void {
        this.commands.set(command.name, command);
    }

    public unregisterCommand(commandName: string): void {
        this.commands.delete(commandName);
    }

    public getCommand(commandName: string): ITextCommand | undefined {
        return this.commands.get(commandName);
    }

    public getAllCommands(): Map<string, ITextCommand> {
        return new Map(this.commands);
    }

    public async executeCommand(commandName: string, ...args: unknown[]): Promise<void> {
        const command = this.commands.get(commandName);
        if (!command) {
            throw new Error(`Команда ${commandName} не найдена`);
        }
        
        const message = args[0] as Message;
        await command.execute(message);
    }

    public async handleMessage(message: Message): Promise<void> {
        if (message.author.bot) return;
        if (!message.content.startsWith(config.prefix)) return;

        const args = message.content.slice(config.prefix.length).trim().split(/ +/);
        const commandName = args.shift()?.toLowerCase();

        if (!commandName) return;

        const command = this.commands.get(commandName);
        if (!command) return;

        try {
            await command.execute(message);
        } catch (error) {
            console.error(`Ошибка выполнения команды ${command.name}:`, error);
            await message.reply('❌ Произошла ошибка при выполнении команды!');
        }
    }
} 