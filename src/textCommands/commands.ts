import { ITextCommand } from '../types/index.ts';
import { EmbedBuilder } from 'discord.js';
import { commands } from './index.ts';

export const command: ITextCommand = {
    name: 'commands',
    description: 'Список всех команд',
    usage: 'commands',
    execute: async (message) => {
        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('Список всех команд')
            .setDescription(Array.from(commands.values()).map((command) => `- !${command.name}: ${command.description}`).join('\n'));
        await message.reply({ embeds: [embed] });
    } 
};