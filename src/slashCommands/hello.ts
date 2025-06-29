import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';
import { SlashCommand } from '../types/index.ts';

export const hello: SlashCommand = {
    data: new SlashCommandBuilder()
        .setName('hello')
        .setDescription('Приветствует пользователя'),
    execute: async (interaction: ChatInputCommandInteraction) => {
        await interaction.reply(`Hello, ${interaction.user.username}! 👋`);
    },
}; 