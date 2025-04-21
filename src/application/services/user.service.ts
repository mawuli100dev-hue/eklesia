import { BaseService } from './base.service';
import { User } from '../../domain/entities/user';
import prisma from '../../../prisma/client/prisma.service';

export class UserService extends BaseService<User> {
    constructor() {
        super(prisma.user);
    }

    private prismaToModel(prismaUser: any): User {
        return new User({
            id: prismaUser.id,
            firstName: prismaUser.firstName || undefined,
            lastName: prismaUser.lastName || undefined,
            email: prismaUser.email,
            password: prismaUser.password || undefined,
            language: prismaUser.language || undefined,
            role: prismaUser.role,
            provider: prismaUser.provider,
            providerId: prismaUser.providerId || undefined,
            events: prismaUser.events,
            forums: prismaUser.forums,
            messages: prismaUser.messages
        });
    }

    async findAll(): Promise<User[]> {
        const users = await super.findAll();
        return users.map(user => this.prismaToModel(user));
    }

    async findById(id: number): Promise<User | null> {
        const user = await super.findById(id);
        return user ? this.prismaToModel(user) : null;
    }

    async findByEmail(email: string): Promise<User | null> {
        const user = await prisma.user.findUnique({
            where: { email }
        });
        return user ? this.prismaToModel(user) : null;
    }

    async findWithRelations(id: number): Promise<User | null> {
        const user = await prisma.user.findUnique({
            where: { id },
            include: {
                events: true,
                forums: true,
                messages: true
            }
        });
        return user ? this.prismaToModel(user) : null;
    }
} 