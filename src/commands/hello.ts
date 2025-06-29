import { Command } from '../types/index.ts';

export const hello: Command = {
    name: 'hello',
    description: 'Приветствует пользователя',
    usage: 'hello',
    execute: async (message) => {
        await message.reply(`Hello, ${message.author.username}! 👋`);
    },
}; 