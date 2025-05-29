import prisma from '../../../prisma/client/prisma.service';

export class BaseService<T> {
    protected model: any;

    constructor(model: any) {
        this.model = model;
    }

    async findAll(): Promise<T[]> {
        return this.model.findMany();
    }

    async findById(id: number): Promise<T | null> {
        return this.model.findUnique({
            where: { id }
        });
    }

    async create(data: Partial<T>): Promise<T> {
        const { texts, ...dataWithoutRelations } = data as any;
        return this.model.create({
            data: dataWithoutRelations
        });
    }

    async update(id: number, data: Partial<T>): Promise<T> {
        const { texts, ...dataWithoutRelations } = data as any;
        return this.model.update({
            where: { id },
            data: dataWithoutRelations
        });
    }

    async delete(id: number): Promise<boolean> {
        return this.model.delete({
            where: { id }
        });
    }
} 