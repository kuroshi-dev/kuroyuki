import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';
import { ISlashCommand } from '../types/index.ts';

export const hello: ISlashCommand = {
    name: 'hello',
    description: 'Приветствует пользователя',
    data: new SlashCommandBuilder()
        .setName('hello')
        .setDescription('Приветствует пользователя'),
    execute: async (interaction: ChatInputCommandInteraction) => {
        await interaction.reply(`Hello, ${interaction.user.username}! 👋`);
    },
}; 