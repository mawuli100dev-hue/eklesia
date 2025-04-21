import { BaseService } from './base.service';
import { Reading_FR } from '../../domain/entities/reading_FR';
import prisma from '../../../prisma/client/prisma.service';

export class Reading_FRService extends BaseService<Reading_FR> {
    constructor() {
        super(prisma.reading_FR);
    }

    private prismaToModel(prismaReading: any): Reading_FR {
        return new Reading_FR({
            id: prismaReading.id,
            weekday: prismaReading.weekday,
            date: prismaReading.date,
            label: prismaReading.label || undefined,
            theme: prismaReading.theme,
            text: prismaReading.text
        });
    }

    async findAll(): Promise<Reading_FR[]> {
        const readings = await super.findAll();
        return readings.map(reading => this.prismaToModel(reading));
    }

    async findById(id: number): Promise<Reading_FR | null> {
        const reading = await super.findById(id);
        return reading ? this.prismaToModel(reading) : null;
    }

    async findByDate(date: string): Promise<Reading_FR | null> {
        const reading = await prisma.reading_FR.findFirst({
            where: { date }
        });
        return reading ? this.prismaToModel(reading) : null;
    }

    async findByWeekday(weekday: string): Promise<Reading_FR[]> {
        const readings = await prisma.reading_FR.findMany({
            where: { weekday }
        });
        return readings.map(reading => this.prismaToModel(reading));
    }

    async findByTheme(theme: string): Promise<Reading_FR[]> {
        const readings = await prisma.reading_FR.findMany({
            where: { theme }
        });
        return readings.map(reading => this.prismaToModel(reading));
    }
} 