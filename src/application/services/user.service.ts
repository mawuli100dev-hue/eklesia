import { BaseService } from './base.service';
import { User } from '../../domain/entities/user.entity';
import prisma from '../../../prisma/client/prisma.service';
import { comparePassword } from '../helper/hash-compare-pwd';

class UserService extends BaseService<User> {
    private static instance: UserService;

    constructor() {
        super(prisma.user);
    }

    public static getInstance(): UserService {
        if (!UserService.instance) {
            UserService.instance = new UserService();
        }
        return UserService.instance;
    }

    private prismaToModel(prismaUser: any): User {
        return new User({
            id: prismaUser.id,
            name: prismaUser.name || undefined,
            email: prismaUser.email,
            password: prismaUser.password || undefined,
            language: prismaUser.language || undefined,
            role: prismaUser.role,
            provider: prismaUser.provider,
            googleId: prismaUser.googleId || undefined,
            events: prismaUser.events,
            forums: prismaUser.forums,
            messages: prismaUser.messages
        });
    }

    async create(user: any): Promise<User> {
        const createdUser = await super.create(user);
        return this.prismaToModel(createdUser);
    }

    async findAll(): Promise<User[]> {
        const users = await super.findAll();
        return users.map(user => this.prismaToModel(user));
    }

    async findById(id: number): Promise<User | null> {
        const user = await super.findById(id);
        return user ? this.prismaToModel(user) : null;
    }

    async findBygoogleId(googleId: string): Promise<User | null> {
        const user = await prisma.user.findUnique({
            where: { googleId }
        });
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

    public async validateUserPassword(user: any, password: string): Promise<boolean> {
        return user?.password ? await comparePassword(password, user.password) : false;
    }

}

export default UserService.getInstance();