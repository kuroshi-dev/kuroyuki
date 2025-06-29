import { ITextCommand } from '../types/index.ts';
import { spawn } from 'child_process';
import process from 'node:process';

export const restart: ITextCommand = {
    name: 'restart',
    description: 'Перезапускает бота (только для владельца)',
    usage: 'restart',
    execute: async (message) => {
        const ownerId = '837705388262031401';
        if (message.author.id !== ownerId) {
            await message.reply('❌ У вас нет прав для этой команды.');
            return;
        }
        
        const replyMessage = await message.reply('🔄 Бот перезапускается...');
        console.log('🔄 Бот перезапускается...');

        try {
            // Check if the command was run with --dev flag
            const isDev = process.argv.includes('--dev') || process.argv.includes('dev');
            const restartCommand = isDev ? 'npm run dev' : 'npm run restart';
            
            console.log(`🚀 Запускаем команду: ${restartCommand}`);
            
            // Start new process
            const child = spawn(restartCommand, {
                shell: true,
                detached: true,
                stdio: 'inherit',
                cwd: process.cwd()
            });

            // Handle errors
            child.on('error', (error) => {
                console.error('❌ Ошибка запуска нового процесса:', error);
                replyMessage.edit('❌ Ошибка при запуске нового процесса.');
            });

            // Detach new process from parent
            child.unref();

            // End current process
            await replyMessage.edit('✅ Бот успешно перезапущен!');
            console.log('✅ Бот успешно перезапущен!');
            
            // Give time to send message
            setTimeout(() => {
                console.log('🛑 Завершение текущего процесса...');
                process.exit(0);
            }, 2000);

        } catch (error) {
            console.error('❌ Ошибка при перезапуске бота:', error);
            await replyMessage.edit('❌ Ошибка при перезапуске бота.');
        }
    },
}; 