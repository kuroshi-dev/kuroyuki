import { REST, Routes } from 'discord.js';
import { slashCommands } from './slashCommands/index.ts';
import { config } from './config/index.ts';

async function deployCommands() {
    try {
        const rest = new REST({ version: '10' }).setToken(config.token);
        const commandData = slashCommands.map(command => command.data.toJSON());

        console.log('🔄 Начинаю регистрацию slash команд...');

        await rest.put(
            Routes.applicationCommands(config.clientId),
            { body: commandData }
        );

        console.log(`✅ Успешно зарегистрировано ${commandData.length} slash команд!`);
        console.log('📋 Зарегистрированные команды:');
        slashCommands.forEach(command => {
            console.log(`  - /${command.data.name}: ${command.data.description}`);
        });
    } catch (error) {
        console.error('❌ Ошибка при регистрации команд:', error);
    }
}

deployCommands(); 