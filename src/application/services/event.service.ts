import { BaseService } from './base.service';
import { Event } from '../../domain/entities/event';
import prisma from '../../../prisma/client/prisma.service';

export class EventService extends BaseService<Event> {
    constructor() {
        super(prisma.event);
    }

    private prismaToModel(prismaEvent: any): Event {
        return new Event({
            id: prismaEvent.id,
            title: prismaEvent.title,
            description: prismaEvent.description,
            date: prismaEvent.date,
            location: prismaEvent.location,
            language: prismaEvent.language,
            users: prismaEvent.users,
            messages: prismaEvent.messages
        });
    }

    async findAll(): Promise<Event[]> {
        const events = await super.findAll();
        return events.map(event => this.prismaToModel(event));
    }

    async findById(id: number): Promise<Event | null> {
        const event = await super.findById(id);
        return event ? this.prismaToModel(event) : null;
    }

    async findWithRelations(id: number): Promise<Event | null> {
        const event = await prisma.event.findUnique({
            where: { id },
            include: {
                users: true,
                messages: true
            }
        });
        return event ? this.prismaToModel(event) : null;
    }

    async findByDateRange(startDate: Date, endDate: Date): Promise<Event[]> {
        const events = await prisma.event.findMany({
            where: {
                date: {
                    gte: startDate,
                    lte: endDate
                }
            }
        });
        return events.map(event => this.prismaToModel(event));
    }
} 