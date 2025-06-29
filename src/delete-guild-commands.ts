import { REST, Routes } from 'discord.js';
import { config } from './config/index.ts';

const guildId = '1088020056899862551';

async function deleteGuildCommands() {
    try {
        const rest = new REST({ version: '10' }).setToken(config.token);

        console.log(`🗑️ Начинаю удаление всех slash команд на сервере ${guildId}...`);

        await rest.put(
            Routes.applicationGuildCommands(config.clientId, guildId),
            { body: [] }
        );

        console.log('✅ Все slash команды на сервере успешно удалены!');
    } catch (error) {
        console.error('❌ Ошибка при удалении команд:', error);
    }
}

deleteGuildCommands(); 