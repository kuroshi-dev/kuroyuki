import { Client, ActivityType } from 'discord.js';

export class ActivityManager {
    private client: Client;

    constructor(client: Client) {
        this.client = client;
    }

    public setActivity(): void {
        if (!this.client.user) return;

        this.client.user.setActivity({
            name: 'Kuroyuki',
            type: ActivityType.Listening,
        });
    }

    public setCustomActivity(name: string, type: ActivityType) {
        if (!this.client.user) return;

        this.client.user.setActivity({
            name: name,
            type: type,
        });
    }

    public setPresence(status: 'online' | 'idle' | 'dnd' | 'invisible') {
        if (!this.client.user) return;

        this.client.user.setPresence({
            status: status
        });
    }
}