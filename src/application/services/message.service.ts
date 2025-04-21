import { BaseService } from './base.service';
import { Message } from '../../domain/entities/message.entity';
import prisma from '../../../prisma/client/prisma.service';

export class MessageService extends BaseService<Message> {
    private static instance: MessageService;

    constructor() {
        super(prisma.message);
    }

    public static getInstance(): MessageService {
        if (!MessageService.instance) {
            MessageService.instance = new MessageService();
        }
        return MessageService.instance;
    }

    private prismaToModel(prismaMessage: any): Message {
        return new Message({
            id: prismaMessage.id,
            content: prismaMessage.content,
            timestamp: prismaMessage.timestamp,
            eventId: prismaMessage.eventId || undefined,
            event: prismaMessage.event,
            forumId: prismaMessage.forumId || undefined,
            forum: prismaMessage.forum,
            userId: prismaMessage.userId || undefined,
            user: prismaMessage.user
        });
    }

    async findAll(): Promise<Message[]> {
        const messages = await super.findAll();
        return messages.map(message => this.prismaToModel(message));
    }

    async findById(id: number): Promise<Message | null> {
        const message = await super.findById(id);
        return message ? this.prismaToModel(message) : null;
    }

    async findWithRelations(id: number): Promise<Message | null> {
        const message = await prisma.message.findUnique({
            where: { id },
            include: {
                user: true,
                event: true,
                forum: true
            }
        });
        return message ? this.prismaToModel(message) : null;
    }

    async findByEventId(eventId: number): Promise<Message[]> {
        const messages = await prisma.message.findMany({
            where: { eventId }
        });
        return messages.map(message => this.prismaToModel(message));
    }

    async findByForumId(forumId: number): Promise<Message[]> {
        const messages = await prisma.message.findMany({
            where: { forumId }
        });
        return messages.map(message => this.prismaToModel(message));
    }
}

export default MessageService.getInstance();