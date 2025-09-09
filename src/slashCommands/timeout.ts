import { SlashCommandBuilder, ChatInputCommandInteraction, GuildMember, StringSelectMenuBuilder, ActionRowBuilder } from 'discord.js';
import { ISlashCommand } from '../types/index.ts';

export const timeout: ISlashCommand = {
    name: 'timeout',
    description: 'Отправляет пользователя в таймаут',
    data: new SlashCommandBuilder()
        .setName('timeout')
        .setDescription('Отправляет пользователя в таймаут')
        .addUserOption(option => option.setName('member').setDescription('Member to timeout').setRequired(true)),
    execute: async (interaction: ChatInputCommandInteraction) => {
        const member = interaction.options.getMember('member') as GuildMember;
        if (!member) {
            await interaction.reply({ content: 'Member not found', ephemeral: true });
            return;
        }

        const selectMenu = new StringSelectMenuBuilder()
            .setCustomId(`timeout_duration_${member.id}`)
            .setPlaceholder('Выберите продолжительность таймаута')
            .addOptions([
                { label: '⏱️ 1 минута', value: '60' },
                { label: '⏱️ 5 минут', value: '300' },
                { label: '⏱️ 10 минут', value: '600' },
                { label: '⏱️ 30 минут', value: '1800' },
                { label: '🕒 1 час', value: '3600' },
                { label: '📅 1 день', value: '86400' },
                { label: '🗓️ 1 неделя', value: '604800' }
            ]);
        const row = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(selectMenu);

        await interaction.reply({
            content: `Выберите продолжительность таймаута для <@${member.id}>:`,
            components: [row],
            ephemeral: true,
        });
    },
};
