import { REST, Routes } from 'discord.js';
import { config } from './config/index.ts';
import process from 'node:process';

export async function deleteCommands() {
    try {
        const rest = new REST({ version: '10' }).setToken(config.token);

        console.log('🗑️ Начинаю удаление всех slash команд...');

        await rest.put(
            Routes.applicationCommands(config.clientId),
            { body: [] }
        );

        console.log('✅ Все slash команды успешно удалены!');
    } catch (error) {
        console.error('❌ Ошибка при удалении команд:', error);
    }
}

// Run deleteCommands if the script is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
    deleteCommands();
} 