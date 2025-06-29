import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';
import { ISlashCommand } from '../types/index.ts';

export const ping: ISlashCommand = {
    name: 'ping',
    description: 'Проверяет задержку бота',
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