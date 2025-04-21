import { Role } from '../enums/Role';
import { AuthProvider } from '../enums/AuthProvider';
import { Event } from './event.entity';
import { Forum } from './forum.entity';
import { Message } from './message.entity';

export class User {
    id: number;
    name?: string;
    email: string;
    password?: string;
    language?: string;
    role: Role;
    provider: AuthProvider;
    googleId?: string;

    // Relations
    events?: Event[];
    forums?: Forum[];
    messages?: Message[];

    constructor(data: Partial<User>) {
        this.id = data.id || 0;
        this.name = data.name || '';
        this.email = data.email || '';
        this.password = data.password;
        this.language = data.language;
        this.role = data.role || Role.USER;
        this.provider = data.provider || AuthProvider.CREDENTIALS;
        this.googleId = data.googleId;
        this.events = data.events;
        this.forums = data.forums;
        this.messages = data.messages;
    }
} 