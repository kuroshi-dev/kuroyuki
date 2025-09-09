import { Bot } from './core/Bot.ts';
import process from 'node:process';

console.log(`🚀 Запуск бота... PID: ${process.pid}`);

const bot = new Bot();

// Make bot instance available through client
bot.getClient().bot = bot;

bot.start().catch(console.error); 