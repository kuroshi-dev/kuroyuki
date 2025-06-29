import { BotConfig } from '../types/index.ts';
import { GatewayIntentBits } from 'discord.js';
import dotenv from 'dotenv';
import process from "node:process";

dotenv.config();

const settings = {
    prefix: "-",
    embed: {
        color: "#0099ff",
        footer: {
            text: "Kuroyuki Bot",
            iconURL: ""
        },
        author: {
            name: "Kuroyuki",
            iconURL: ""
        }
    }
} as const;

export const config: BotConfig = {
    token: process.env.DISCORD_TOKEN || '',
    prefix: settings.prefix,
    clientId: process.env.CLIENT_ID || '',
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
}; 