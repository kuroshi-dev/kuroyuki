import { BotConfig } from '../types/index.ts';
import { GatewayIntentBits } from 'discord.js';
import dotenv from 'dotenv';
import process from "node:process";

dotenv.config();

export const config: BotConfig = {
    token: process.env.DISCORD_TOKEN || '',
    prefix: process.env.PREFIX || '!',
    clientId: process.env.CLIENT_ID || '',
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
}; 