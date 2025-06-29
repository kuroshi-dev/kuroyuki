import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';
import { SlashCommand } from '../types/index.ts';

export const ping: SlashCommand = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Проверяет задержку бота'),
    execute: async (interaction: ChatInputCommandInteraction) => {
        const sent = await interaction.reply({ 
            content: 'Pong! 🏓', 
            ephemeral: true
        });
        
        const latency = sent.createdTimestamp - interaction.createdTimestamp;
        await interaction.editReply(`Pong! 🏓 Задержка: ${latency}ms`);
    },
}; 