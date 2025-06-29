import { IEvent } from '../types/index.ts';
import { Client, Interaction } from 'discord.js';
import { SlashCommandHandler } from '../services/SlashCommandHandler.ts';

export const interactionCreate: IEvent = {
    name: 'interactionCreate',
    execute: async (...args: unknown[]) => {
        const interaction = args[0] as Interaction;
        if (!interaction.isChatInputCommand()) return;

        const { slashCommandHandler } = (interaction.client as Client & { slashCommandHandler: SlashCommandHandler });
        if (slashCommandHandler) {
            await slashCommandHandler.handleInteraction(interaction);
        }
    },
}; 