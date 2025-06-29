import { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } from 'discord.js';
import { ISlashCommand } from '../types/index.ts';
import { slashCommands } from './index.ts';

export const commands: ISlashCommand = {
    name: 'commands',
    description: 'Список всех команд и помощь',
    data: new SlashCommandBuilder()
        .setName('commands')
        .setDescription('Список всех команд и помощь'),
    execute: async (interaction: ChatInputCommandInteraction) => {
        const commandName = interaction.options.getString('command');
        const command = slashCommands.find((cmd: ISlashCommand) => cmd.data.name === commandName);
        if (command) {
            const embed = new EmbedBuilder()
                .setColor('#0099ff')
                .setTitle(command.data.name)
                .setDescription(command.data.description);
            await interaction.reply({ embeds: [embed] });
        } else {
            const embed = new EmbedBuilder()
                .setColor('#0099ff')
                .setTitle('Неизвестная команда')
                .setDescription('Пожалуйста, используйте `/help` для получения списка доступных команд');
            await interaction.reply({ embeds: [embed] });
        }
        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('Список всех команд')
            .setDescription(Array.from(slashCommands.values()).map((command: ISlashCommand) => `- /${command.data.name}: ${command.data.description}`).join('\n'))
            .addFields(
                { name: 'Помощь', value: 'Используйте `/help <команда>` для получения подробной информации о конкретной команде' }
            );
        await interaction.reply({ embeds: [embed] });
    }
};