import { User } from './user';
import { Event } from './event';
import { Forum } from './forum';

export class Message {
    id: number;
    content: string;
    timestamp: Date;

    // Relations
    eventId?: number;
    event?: Event;
    forumId?: number;
    forum?: Forum;
    userId?: number;
    user?: User;

    constructor(data: Partial<Message>) {
        this.id = data.id || 0;
        this.content = data.content || '';
        this.timestamp = data.timestamp || new Date();
        this.eventId = data.eventId;
        this.event = data.event;
        this.forumId = data.forumId;
        this.forum = data.forum;
        this.userId = data.userId;
        this.user = data.user;
    }
} 