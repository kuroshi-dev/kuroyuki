import { Client } from 'discord.js';
import { config } from '../config/index.ts';
import { EventManager } from '../services/EventManager.ts';
import { CommandHandler } from '../services/CommandHandler.ts';
import { SlashCommandHandler } from '../services/SlashCommandHandler.ts';
import process from "node:process";

export class Bot {
    private client: Client;
    private eventManager: EventManager;
    private commandHandler: CommandHandler;
    private slashCommandHandler: SlashCommandHandler;

    constructor() {
        this.client = new Client({
            intents: config.intents,
        });

        this.eventManager = new EventManager(this.client);
        this.commandHandler = new CommandHandler(this.client);
        this.slashCommandHandler = new SlashCommandHandler(this.client);

        this.setupClient();
    }

    private setupClient(): void {
        (this.client as Client & { slashCommandHandler: SlashCommandHandler }).slashCommandHandler = this.slashCommandHandler;
    }

    public async start(): Promise<void> {
        try {
            if (!config.token) {
                throw new Error('DISCORD_TOKEN не установлен в переменных окружения');
            }

            if (!config.clientId) {
                throw new Error('CLIENT_ID не установлен в переменных окружения');
            }

            console.log('🚀 Бот запускается...');
            
            this.eventManager.registerEvents();
            await this.client.login(config.token);

            await this.slashCommandHandler.registerCommands();

        } catch (error) {
            console.error('❌ Ошибка запуска бота:', error);
            process.exit(1);
        }
    }

    public getClient(): Client {
        return this.client;
    }

    public getCommandHandler(): CommandHandler {
        return this.commandHandler;
    }

    public getSlashCommandHandler(): SlashCommandHandler {
        return this.slashCommandHandler;
    }
} 