import { Command } from '../types/index.ts';
import process from "node:process";

export const restart: Command = {
    name: 'restart',
    description: 'Перезапускает бота (только для владельца)',
    usage: 'restart',
    execute: async (message) => {
        const ownerId = '837705388262031401';
        if (message.author.id !== ownerId) {
            await message.reply('❌ У вас нет прав для этой команды.');
            return;
        }
        await message.reply('🔄 Бот перезапускается...');
        console.log('🔄 Бот перезапускается...');
        
        try{
            console.log('✅ Бот успешно перезапущен!');
        } catch (error) {
            console.error('❌ Ошибка при перезапуске бота:', error);
        }

        process.exit(0);
    },
}; 