import { Role } from '../enums/Role';
import { AuthProvider } from '../enums/AuthProvider';
import { Event } from './event';
import { Forum } from './forum';
import { Message } from './Message';

export class User {
    id: number;
    firstName?: string;
    lastName?: string;
    email: string;
    password?: string;
    language?: string;
    role: Role;
    provider: AuthProvider;
    providerId?: string;

    // Relations
    events?: Event[];
    forums?: Forum[];
    messages?: Message[];

    constructor(data: Partial<User>) {
        this.id = data.id || 0;
        this.firstName = data.firstName;
        this.lastName = data.lastName;
        this.email = data.email || '';
        this.password = data.password;
        this.language = data.language;
        this.role = data.role || Role.USER;
        this.provider = data.provider || AuthProvider.CREDENTIALS;
        this.providerId = data.providerId;
        this.events = data.events;
        this.forums = data.forums;
        this.messages = data.messages;
    }
} 