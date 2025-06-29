import { SlashCommandBuilder, SlashCommandSubcommandsOnlyBuilder, SlashCommandOptionsOnlyBuilder, ChatInputCommandInteraction, Message } from 'discord.js';

export interface BotConfig {
    token: string;
    prefix: string;
    intents: number[];
    clientId: string;
}

export interface Command {
    name: string;
    description: string;
    usage: string;
    execute: (message: Message) => Promise<void>;
}

export interface CommandHandler {
    commands: Map<string, Command>;
}

export interface SlashCommand {
    data: SlashCommandBuilder | SlashCommandSubcommandsOnlyBuilder | SlashCommandOptionsOnlyBuilder;
    execute: (interaction: ChatInputCommandInteraction) => Promise<void>;
}

export interface Event {
    name: string;
    once?: boolean;
    execute: (...args: unknown[]) => Promise<void> | void;
} 