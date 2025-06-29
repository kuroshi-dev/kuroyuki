import { ITextCommand } from '../types/index.ts';
import { EmbedBuilder, Role } from 'discord.js';

export const userinfo: ITextCommand = {
    name: 'userinfo',
    description: 'Показывает информацию о пользователе',
    usage: 'userinfo',
    execute: async (message) => {
        const user = message.mentions.users.first() || message.author;
        const member = message.guild?.members.cache.get(user.id);

        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle(`Информация о ${user.username}`)
            .setThumbnail(user.displayAvatarURL())
            .addFields(
                { name: 'ID', value: user.id, inline: true },
                { name: 'Создан', value: user.createdAt.toLocaleDateString(), inline: true },
                { name: 'Присоединился', value: member?.joinedAt?.toLocaleDateString() || 'Неизвестно', inline: true },
                { name: 'Никнейм', value: member?.nickname || 'Не установлен', inline: true },
                { name: 'Роли', value: member?.roles.cache.map((role: Role ) => `<@&${role.id}>\n`).join('') || 'Нет ролей', inline: false }
            )
            .setTimestamp();
        await message.reply({ embeds: [embed] });
    },
};
