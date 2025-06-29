import { IEvent } from '../types/index.ts';
import { Client } from 'discord.js';

export const ready: IEvent = {
    name: 'ready',
    once: true,
    execute: (...args: unknown[]) => {
        const client = args[0] as Client;
        console.log(`✅ Бот ${client.user?.tag} успешно запущен!`);
        console.log(`🆔 ID бота: ${client.user?.id}`);
        console.log(`📊 Серверов: ${client.guilds.cache.size}`);
    },
}; 