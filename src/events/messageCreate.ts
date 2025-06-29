import { IEvent } from '../types/index.ts';
import { Message } from 'discord.js';
import { commands } from '../textCommands/index.ts';
import { config } from '../config/index.ts';

export const messageCreate: IEvent = {
    name: 'messageCreate',
    execute: async (...args: unknown[]) => {
        const message = args[0] as Message;
        if (message.author.bot) return;
        if (!message.content.startsWith(config.prefix)) return;

        const commandArgs = message.content.slice(config.prefix.length).trim().split(/ +/);
        const commandName = commandArgs.shift()?.toLowerCase();

        if (!commandName) return;

        const command = commands.get(commandName);
        if (!command) return;

        try {
            await command.execute(message);
        } catch (error) {
            console.error(`Ошибка выполнения команды ${commandName}:`, error);
            await message.reply('❌ Произошла ошибка при выполнении команды!');
        }
    },
}; 