import { Command } from '../types/index.ts';
import process from "node:process";

export const shutdown: Command = {
    name: 'shutdown',
    description: 'Останавливает бота (только для владельца)',
    usage: 'shutdown',
    execute: async (message) => {
        const ownerId = '837705388262031401';
        if (message.author.id !== ownerId) {
            await message.reply('❌ У вас нет прав для этой команды.');
            return;
        }
        await message.reply('⏹️ Бот останавливается...');
        console.log('⏹️ Бот останавливается...');
        try{
            console.log('✅ Бот успешно остановлен!');
        } catch (error) {
            console.error('❌ Ошибка при остановке бота:', error);
        }
        process.exit(0);
    },
}; 