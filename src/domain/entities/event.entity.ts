import { User } from './user.entity';
import { Message } from './message.entity';

export class Event {
    id: number;
    title: string;
    description: string;
    date: Date;
    location: string;
    language: string;

    // Relations
    users?: User[];
    messages?: Message[];

    constructor(data: Partial<Event>) {
        this.id = data.id || 0;
        this.title = data.title || '';
        this.description = data.description || '';
        this.date = data.date || new Date();
        this.location = data.location || '';
        this.language = data.language || '';
        this.users = data.users;
        this.messages = data.messages;
    }
} 