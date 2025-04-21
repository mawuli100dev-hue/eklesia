import { BaseService } from './base.service';
import { Forum } from '../../domain/entities/forum.entity';
import prisma from '../../../prisma/client/prisma.service';
import e from 'express';

class ForumService extends BaseService<Forum> {
    private static instance: ForumService;

    constructor() {
        super(prisma.forum);
    }

    public static getInstance(): ForumService {
        if (!ForumService.instance) {
            ForumService.instance = new ForumService();
        }
        return ForumService.instance;
    }

    private prismaToModel(prismaForum: any): Forum {
        return new Forum({
            id: prismaForum.id,
            name: prismaForum.name,
            type: prismaForum.type,
            members: prismaForum.members,
            messages: prismaForum.messages
        });
    }

    async findAll(): Promise<Forum[]> {
        const forums = await super.findAll();
        return forums.map(forum => this.prismaToModel(forum));
    }

    async findById(id: number): Promise<Forum | null> {
        const forum = await super.findById(id);
        return forum ? this.prismaToModel(forum) : null;
    }

    async findWithRelations(id: number): Promise<Forum | null> {
        const forum = await prisma.forum.findUnique({
            where: { id },
            include: {
                members: true,
                messages: true
            }
        });
        return forum ? this.prismaToModel(forum) : null;
    }

    async findByType(type: string): Promise<Forum[]> {
        const forums = await prisma.forum.findMany({
            where: { type }
        });
        return forums.map(forum => this.prismaToModel(forum));
    }
}

export default ForumService.getInstance();