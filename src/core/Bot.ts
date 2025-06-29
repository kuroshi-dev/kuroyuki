import { Client } from 'discord.js';
import { config } from '../config/index.ts';
import { EventManager } from '../services/EventManager.ts';
import { CommandHandler } from '../services/CommandHandler.ts';
import { SlashCommandHandler } from '../services/SlashCommandHandler.ts';
import { IBot, ITextCommandHandler, ISlashCommandHandler, IEventManager } from '../types/index.ts';
import { events } from '../events/index.ts';
import process from "node:process";

export class Bot implements IBot {
    private client: Client;
    private eventManager: IEventManager;
    private commandHandler: ITextCommandHandler;
    private slashCommandHandler: ISlashCommandHandler;

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
        (this.client as Client & { slashCommandHandler: ISlashCommandHandler }).slashCommandHandler = this.slashCommandHandler;
    }

    public async start(): Promise<void> {
        try {
            if (!config.token) {
                throw new Error('DISCORD_TOKEN не установлен в переменных окружения');
            }

            if (!config.clientId) {
                throw new Error('CLIENT_ID не установлен в переменных окружения');
            }
            
            this.eventManager.registerEvents(events);
            // console.log('✅ События зарегистрированы');
            
            await this.client.login(config.token);
            // console.log('✅ Бот успешно подключился к Discord');

            await this.slashCommandHandler.registerCommands();
            // console.log('✅ Slash команды зарегистрированы');

        } catch (error) {
            console.error('❌ Ошибка запуска бота:', error);
            process.exit(1);
        }
    }

    public async stop(): Promise<void> {
        try {
            await this.client.destroy();
            console.log('🛑 Бот остановлен');
        } catch (error) {
            console.error('❌ Ошибка при остановке бота:', error);
        }
    }

    public getClient(): Client {
        return this.client;
    }

    public getCommandHandler(): ITextCommandHandler {
        return this.commandHandler;
    }

    public getSlashCommandHandler(): ISlashCommandHandler {
        return this.slashCommandHandler;
    }

    public getEventManager(): IEventManager {
        return this.eventManager;
    }
} 