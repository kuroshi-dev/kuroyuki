import { Client, Events } from 'discord.js';
import { Event } from '../types/index.ts';
import { events } from '../events/index.ts';

export class EventManager {
    private client: Client;

    constructor(client: Client) { this.client = client; }

    public registerEvents(): void {
        events.forEach(event => {
            if (event.once) {
                this.client.once(event.name as keyof typeof Events, event.execute);
            } else {
                this.client.on(event.name as keyof typeof Events, event.execute);
            }
        });
    }

    public registerCustomEvent(event: Event): void {
        if (event.once) {
            this.client.once(event.name as keyof typeof Events, event.execute);
        } else {
            this.client.on(event.name as keyof typeof Events, event.execute);
        }
    }
} 