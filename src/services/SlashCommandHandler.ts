import { Client, Collection, REST, Routes, Interaction, ChatInputCommandInteraction } from 'discord.js';
import { ISlashCommand, ISlashCommandHandler } from '../types/index.ts';
import { slashCommands } from '../slashCommands/index.ts';
import { config } from '../config/index.ts';

export class SlashCommandHandler implements ISlashCommandHandler {
    private client: Client;
    private commands: Collection<string, ISlashCommand>;

    constructor(client: Client) {
        this.client = client;
        this.commands = new Collection();
        this.loadCommands();
    }

    private loadCommands(): void {
        console.log(`📦 Загружено ${slashCommands.length} slash-команд.`);
        slashCommands.forEach(command => {
            this.commands.set(command.data.name, command);
            // console.log(`  - /${command.data.name}: ${command.data.description}`);
        });
    }

    public registerCommand(command: ISlashCommand): void {
        this.commands.set(command.data.name, command);
    }

    public unregisterCommand(commandName: string): void {
        this.commands.delete(commandName);
    }

    public getCommand(commandName: string): ISlashCommand | undefined {
        return this.commands.get(commandName);
    }

    public getAllCommands(): Map<string, ISlashCommand> {
        return new Map(this.commands);
    }

    public async executeCommand(commandName: string, ...args: unknown[]): Promise<void> {
        const command = this.commands.get(commandName);
        if (!command) {
            throw new Error(`Slash команда ${commandName} не найдена`);
        }
        
        const interaction = args[0] as ChatInputCommandInteraction;
        await command.execute(interaction);
    }

    public async registerCommands(): Promise<void> {
        try {
            const rest = new REST({ version: '10' }).setToken(config.token);
            const commandData = slashCommands.map(command => command.data.toJSON());

            await rest.put(
                Routes.applicationCommands(config.clientId),
                { body: commandData }
            );

        } catch (error) {
            console.error('❌ Ошибка при регистрации slash команд:', error);
            throw error;
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
}