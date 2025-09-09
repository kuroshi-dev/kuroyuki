import { SlashCommandBuilder, SlashCommandSubcommandsOnlyBuilder, SlashCommandOptionsOnlyBuilder, ChatInputCommandInteraction, Message, Client } from 'discord.js';
import { ActivityManager } from '../services/ActivityManager.ts';

// Extend Discord.js Client type
declare module 'discord.js' {
    interface Client {
        bot?: IBot;
    }
}

// Bot config interface
export interface BotConfig {
    token: string;
    prefix: string;
    intents: number[];
    clientId: string;
}

// base command interface
export interface ICommand {
    readonly name: string;
    readonly description: string;
       execute(...args: unknown[]): Promise<void>;
}

// text command interface
export interface ITextCommand extends ICommand {
    readonly usage: string;
    execute(message: Message): Promise<void>;
}

// slash command interface
export interface ISlashCommand extends ICommand {
    readonly data: SlashCommandBuilder | SlashCommandSubcommandsOnlyBuilder | SlashCommandOptionsOnlyBuilder;
    execute(interaction: ChatInputCommandInteraction): Promise<void>;
}

// command handler interface
export interface ICommandHandler {
    registerCommand(command: ICommand): void;
    unregisterCommand(commandName: string): void;
    getCommand(commandName: string): ICommand | undefined;
    getAllCommands(): Map<string, ICommand>;
    executeCommand(commandName: string, ...args: unknown[]): Promise<void>;
}

// text command handler interface
export interface ITextCommandHandler extends ICommandHandler {
    handleMessage(message: Message): Promise<void>;
    registerCommand(command: ITextCommand): void;
    getCommand(commandName: string): ITextCommand | undefined;
    getAllCommands(): Map<string, ITextCommand>;
}

// slash command handler interface
export interface ISlashCommandHandler extends ICommandHandler {
    registerCommands(): Promise<void>;
    handleInteraction(interaction: ChatInputCommandInteraction): Promise<void>;
    registerCommand(command: ISlashCommand): void;
    getCommand(commandName: string): ISlashCommand | undefined;
    getAllCommands(): Map<string, ISlashCommand>;
}

// event interface
export interface IEvent {
    readonly name: string;
    readonly once?: boolean;
    execute(...args: unknown[]): Promise<void> | void;
}

// event manager interface
export interface IEventManager {
    registerEvent(event: IEvent): void;
    unregisterEvent(eventName: string): void;
    registerEvents(events: IEvent[]): void;
}

// bot interface
export interface IBot {
    start(): Promise<void>;
    stop(): Promise<void>;
    getClient(): Client; // Discord.js Client
    getCommandHandler(): ITextCommandHandler;
    getSlashCommandHandler(): ISlashCommandHandler;
    getEventManager(): IEventManager;
    getActivityManager(): ActivityManager;
}