import { BaseService } from './base.service';
import { BibleReading } from '../../domain/entities/bibleReading.entity';
import prisma from '../../../prisma/client/prisma.service';
import { Prisma } from '@prisma/client';

class BibleReadingService extends BaseService<BibleReading> {
    private static instance: BibleReadingService;

    private constructor() {
        super(prisma.bibleReading);
    }

    public static getInstance(): BibleReadingService {
        if (!BibleReadingService.instance) {
            BibleReadingService.instance = new BibleReadingService();
        }
        return BibleReadingService.instance;
    }

    private prismaToModel(prismaBibleReading: any): BibleReading {
        return new BibleReading({
            id: prismaBibleReading.id,
            date: prismaBibleReading.date,
            theme: prismaBibleReading.theme,
            description: prismaBibleReading.description,
            language: prismaBibleReading.language,
            texts: prismaBibleReading.texts || []
        });
    }

    async create(data: Partial<BibleReading>): Promise<BibleReading> {
        const { texts, id, ...readingData } = data;
        const reading = await prisma.bibleReading.create({
            data: readingData as Prisma.BibleReadingCreateInput,
            include: {
                texts: true
            }
        });
        return this.prismaToModel(reading);
    }

    async update(id: number, data: Partial<BibleReading>): Promise<BibleReading> {
        const { texts, ...readingData } = data;
        const reading = await prisma.bibleReading.update({
            where: { id },
            data: readingData,
            include: {
                texts: true
            }
        });
        return this.prismaToModel(reading);
    }

    async findAll(): Promise<BibleReading[]> {
        const readings = await prisma.bibleReading.findMany({
            include: {
                texts: true
            }
        });
        return readings.map(reading => this.prismaToModel(reading));
    }

    async findById(id: number): Promise<BibleReading | null> {
        const reading = await prisma.bibleReading.findUnique({
            where: { id },
            include: {
                texts: true
            }
        });
        return reading ? this.prismaToModel(reading) : null;
    }

    async findWithRelations(id: number): Promise<BibleReading | null> {
        const reading = await prisma.bibleReading.findUnique({
            where: { id },
            include: {
                texts: true
            }
        });
        return reading ? this.prismaToModel(reading) : null;
    }

    async findByDate(date: Date): Promise<BibleReading | null> {
        const reading = await prisma.bibleReading.findFirst({
            where: { date },
            include: {
                texts: true
            }
        });
        return reading ? this.prismaToModel(reading) : null;
    }

    async findByMonth(month: number): Promise<BibleReading[]> {
        const readings = await prisma.bibleReading.findMany({
            where: {
                date: {
                    gte: new Date(new Date().getFullYear(), month - 1, 1),
                    lt: new Date(new Date().getFullYear(), month, 1)
                }
            },
            include: {
                texts: true
            }
        });
        return readings.map(reading => this.prismaToModel(reading));
    }

    async findByYear(year: number): Promise<BibleReading[]> {
        const readings = await prisma.bibleReading.findMany({
            where: {
                date: {
                    gte: new Date(year - 1, new Date().getMonth(), 1),
                    lt: new Date(year, new Date().getMonth(), 1)
                }
            },
            include: {
                texts: true
            }
        });
        return readings.map(reading => this.prismaToModel(reading));
    }

    async findByTheme(theme: string): Promise<BibleReading[]> {
        const readings = await prisma.bibleReading.findMany({
            where: { theme },
            include: {
                texts: true
            }
        });
        return readings.map(reading => this.prismaToModel(reading));
    }

    async findByLanguage(language: string): Promise<BibleReading[]> {
        const readings = await prisma.bibleReading.findMany({
            where: { language },
            include: {
                texts: true
            }
        });
        return readings.map(reading => this.prismaToModel(reading));
    }
}

export default BibleReadingService.getInstance();