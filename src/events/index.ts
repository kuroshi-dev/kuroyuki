import { ready } from './ready.ts';
import { messageCreate } from './messageCreate.ts';
import { interactionCreate } from './interactionCreate.ts';
import { IEvent } from '../types/index.ts';

export const events: IEvent[] = [
    ready,
    messageCreate,
    interactionCreate,
];

export { ready, messageCreate, interactionCreate }; 