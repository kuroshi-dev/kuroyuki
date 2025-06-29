import { Client, Collection, REST, Routes, Interaction } from 'discord.js';
import { SlashCommand } from '../types/index.ts';
import { slashCommands } from '../slashCommands/index.ts';
import { config } from '../config/index.ts';

export class SlashCommandHandler {
    private client: Client;
    private commands: Collection<string, SlashCommand>;

    constructor(client: Client) {
        this.client = client;
        this.commands = new Collection();
        this.loadCommands();
    }

    private loadCommands(): void {
        console.log(`📦 Загружено ${slashCommands.length} slash команд:`);
        slashCommands.forEach(command => {
            this.commands.set(command.data.name, command);
            console.log(`  - /${command.data.name}: ${command.data.description}`);
        });
    }

    public async registerCommands(): Promise<void> {
        try {
            const rest = new REST({ version: '10' }).setToken(config.token);
            const commandData = slashCommands.map(command => command.data.toJSON());

            console.log('🔄 Начинаю регистрацию slash команд...');
            console.log(`📋 Команды для регистрации: ${commandData.map(cmd => cmd.name).join(', ')}`);

            await rest.put(
                Routes.applicationCommands(config.clientId),
                { body: commandData }
            );

            console.log(`✅ Регистрация завершена! Зарегистрировано ${commandData.length} slash команд`);
        } catch (error) {
            console.error('❌ Ошибка при регистрации slash команд:', error);
            throw error; // Пробрасываем ошибку дальше
        }
    }

    public async handleInteraction(interaction: Interaction): Promise<void> {
        if (!interaction.isChatInputCommand()) return;

        const command = this.commands.get(interaction.commandName);
        if (!command) return;

        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(`Ошибка выполнения slash команды ${interaction.commandName}:`, error);
            
            const errorMessage = '❌ Произошла ошибка при выполнении команды!';
            
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ content: errorMessage, ephemeral: true });
            } else {
                await interaction.reply({ content: errorMessage, ephemeral: true });
            }
        }
    }

    public getCommands(): Collection<string, SlashCommand> { return this.commands; }
} 