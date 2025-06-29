import { ready } from './ready.ts';
import { messageCreate } from './messageCreate.ts';
import { interactionCreate } from './interactionCreate.ts';
import { Event } from '../types/index.ts';

export const events: Event[] = [
    ready,
    messageCreate,
    interactionCreate,
];

export { ready, messageCreate, interactionCreate }; 