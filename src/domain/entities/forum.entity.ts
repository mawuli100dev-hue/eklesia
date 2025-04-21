import { User } from './user.entity';
import { Message } from './message.entity';

export class Forum {
    id: number;
    name: string;
    type: string;

    // Relations
    members?: User[];
    messages?: Message[];

    constructor(data: Partial<Forum>) {
        this.id = data.id || 0;
        this.name = data.name || '';
        this.type = data.type || '';
        this.members = data.members;
        this.messages = data.messages;
    }
} 