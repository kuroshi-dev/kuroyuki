import { SlashCommandBuilder, EmbedBuilder, ChatInputCommandInteraction } from 'discord.js';
import { ISlashCommand } from '../types/index.ts';

export const serverinfo: ISlashCommand = {
    name: 'serverinfo',
    description: 'Показывает информацию о сервере',
    data: new SlashCommandBuilder()
        .setName('serverinfo')
        .setDescription('Показывает информацию о сервере'),
    execute: async (interaction: ChatInputCommandInteraction) => {
        const guild = interaction.guild;
        if (!guild) {
            await interaction.reply({ 
                content: '❌ Эта команда может быть использована только на сервере.', 
                ephemeral: true 
            });
            return;
        }

        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle(`Информация о сервере ${guild.name}`)
            .setThumbnail(guild.iconURL())
            .addFields(
                { name: 'ID', value: guild.id, inline: true },
                { name: 'Создан', value: guild.createdAt.toLocaleDateString(), inline: true },
                { name: 'Участников', value: guild.memberCount.toString(), inline: true },
                { name: 'Каналов', value: guild.channels.cache.size.toString(), inline: true },
                { name: 'Ролей', value: guild.roles.cache.size.toString(), inline: true },
                { name: 'Эмодзи', value: guild.emojis.cache.size.toString(), inline: true },
                { name: 'Владелец', value: `<@${guild.ownerId}>`, inline: true },
                { name: 'Уровень буста', value: guild.premiumTier.toString(), inline: true },
                { name: 'Количество бустов', value: guild.premiumSubscriptionCount?.toString() || '0', inline: true }
            )
            .setTimestamp()
            .setFooter({ text: `ID: ${guild.id}` });

        await interaction.reply({ embeds: [embed] });
    },
};  