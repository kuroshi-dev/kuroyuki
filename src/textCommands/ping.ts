import { ITextCommand } from '../types/index.ts';

export const ping: ITextCommand = {
    name: 'ping',
    description: 'Проверяет задержку бота',
    usage: 'ping',
    execute: async (message) => {
        const reply = await message.reply('Pong! 🏓');
        const latency = reply.createdTimestamp - message.createdTimestamp;
        await reply.edit(`Pong! 🏓 Задержка: ${latency}ms`);
    },
}; 