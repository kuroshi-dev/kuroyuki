import { ITextCommand } from '../types/index.ts';
import process from "node:process";

export const restart: ITextCommand = {
    name: 'restart',
    description: 'Перезапускает бота (только для владельца)',
    usage: 'restart',
    ephemeral: true,
    execute: async (message) => {
        const ownerId = '837705388262031401';
        if (message.author.id !== ownerId) {
            await message.reply('❌ У вас нет прав для этой команды.');
            return;
        }
        await message.reply('🔄 Бот перезапускается...');
        console.log('🔄 Бот перезапускается...');

        try{
            await message.edit('✅ Бот успешно перезапущен!');
            console.log('✅ Бот успешно перезапущен!');
        } catch (error) {
            console.error('❌ Ошибка при перезапуске бота:', error);
            await message.edit('❌ Ошибка при перезапуске бота.');
        }

        process.exit(0);
    },
}; 