import { Bot } from './core/Bot.ts';

const bot = new Bot();

// Make bot instance available through client
bot.getClient().bot = bot;

bot.start().catch(console.error); 