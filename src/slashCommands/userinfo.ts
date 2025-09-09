import { SlashCommandBuilder, EmbedBuilder, Role } from 'discord.js';
import { ISlashCommand } from '../types/index.ts';

export const userinfo: ISlashCommand = {
    name: 'userinfo',
    description: 'Показывает информацию о пользователе',
    data: new SlashCommandBuilder()
        .setName('userinfo')
        .setDescription('Показывает информацию о пользователе')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('Пользователь для получения информации')
                .setRequired(false)) as SlashCommandBuilder,
    execute: async (interaction) => {
        const user = interaction.options.getUser('user') || interaction.user;
        const guild = interaction.guild;
        const member = guild ? await guild.members.fetch(user.id) : null;

        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle(`Информация о ${user.username}`)
            .setThumbnail(user.displayAvatarURL())
            .addFields(
                { name: 'ID', value: user.id, inline: true },
                { name: 'Создан', value: user.createdAt.toLocaleDateString(), inline: true },
                { name: 'Присоединился', value: member?.joinedAt?.toLocaleDateString() || 'Неизвестно', inline: true },
                { name: 'Никнейм', value: member?.nickname || 'Не установлен', inline: true },
                { name: 'Статус', value: member?.presence?.status || 'Неизвестно', inline: true },
                { name: 'Роли', value: member?.roles.cache.map((role: Role) => `<@&${role.id}>\n`).join('') || 'Нет ролей', inline: false }
            )
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    },
}; 