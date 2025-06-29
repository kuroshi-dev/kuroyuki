import { ITextCommand } from '../types/index.ts';

export const redeploy: ITextCommand = {
    name: 'redeploy',
    description: 'Перерегистрирует slash команды (только для владельца)',
    usage: 'redeploy',
    execute: async (message) => {
        const ownerId = '837705388262031401';
        if (message.author.id !== ownerId) {
            await message.reply('❌ У вас нет прав для этой команды.');
            return;
        }
        
        const replyMessage = await message.reply('🔄 Перерегистрация slash команд...');
        console.log('🔄 Перерегистрация slash команд...');

        try {
            // Receive slash command handler from client
            const client = message.client;
            const slashCommandHandler = (client as { bot?: { getSlashCommandHandler(): { registerCommands(): Promise<void> } } }).bot?.getSlashCommandHandler();
            
            if (!slashCommandHandler) {
                throw new Error('SlashCommandHandler не найден');
            }

            // Redeploy commands
            await slashCommandHandler.registerCommands();
            
            await replyMessage.edit('✅ Slash команды успешно перерегистрированы!');
            console.log('✅ Slash команды успешно перерегистрированы!');
        } catch (error) {
            console.error('❌ Ошибка при перерегистрации команд:', error);
            await replyMessage.edit('❌ Ошибка при перерегистрации команд.');
        }
    },
}; 