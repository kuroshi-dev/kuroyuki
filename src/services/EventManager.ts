import { Client, Events } from 'discord.js';
import { IEvent, IEventManager } from '../types/index.ts';

export class EventManager implements IEventManager {
    private client: Client;
    private registeredEvents: Map<string, IEvent>;

    constructor(client: Client) { 
        this.client = client;
        this.registeredEvents = new Map();
    }

    public registerEvent(event: IEvent): void {
        if (this.registeredEvents.has(event.name)) {
            console.warn(`⚠️ Событие ${event.name} уже зарегистрировано! Пропускаем повторную регистрацию.`);
            return;
        }
        
        this.registeredEvents.set(event.name, event);
        
        if (event.once) {
            this.client.once(event.name as keyof typeof Events, event.execute);
        } else {
            this.client.on(event.name as keyof typeof Events, event.execute);
        }
    }

    public unregisterEvent(eventName: string): void {
        const event = this.registeredEvents.get(eventName);
        if (event) {
            this.client.off(eventName as keyof typeof Events, event.execute);
            this.registeredEvents.delete(eventName);
        }
    }

    public registerEvents(events: IEvent[]): void {
        events.forEach(event => this.registerEvent(event));
    }

    public registerCustomEvent(event: IEvent): void {
        this.registerEvent(event);
    }
} 