import { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } from 'discord.js';
import { SlashCommand } from '../types/index.ts';
import { slashCommands } from './index.ts';

export const help: SlashCommand = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Помощь по командам')
        .addStringOption(option =>
            option.setName('команда')
                .setDescription('Название команды для получения подробной информации')
                .setRequired(false)
        ),
    execute: async (interaction: ChatInputCommandInteraction) => {
        const commandName = interaction.options.getString('команда');
        
        if (!commandName) {
            // Показать общий список команд
            const embed = new EmbedBuilder()
                .setColor('#0099ff')
                .setTitle('Помощь по командам')
                .setDescription('Используйте `/help <команда>` для получения подробной информации о конкретной команде')
                .addFields(
                    { name: 'Доступные команды', value: slashCommands.map((command: SlashCommand) => `- /${command.data.name}`).join('\n') }
                );
            await interaction.reply({ embeds: [embed] });
        } else {
            // Показать информацию о конкретной команде
            const command = slashCommands.find((cmd: SlashCommand) => cmd.data.name === commandName);
            
            if (command) {
                const embed = new EmbedBuilder()
                    .setColor('#00ff00')
                    .setTitle(`Помощь: /${command.data.name}`)
                    .setDescription(command.data.description)
                    .addFields(
                        { name: 'Использование', value: `/${command.data.name}`, inline: true },
                        { name: 'Описание', value: command.data.description, inline: true }
                    );
                await interaction.reply({ embeds: [embed] });
            } else {
                const embed = new EmbedBuilder()
                    .setColor('#ff0000')
                    .setTitle('Ошибка')
                    .setDescription(`Команда \`${commandName}\` не найдена. Используйте \`/commands\` для просмотра всех доступных команд.`);
                await interaction.reply({ embeds: [embed] });
            }
        }
    }
}; 