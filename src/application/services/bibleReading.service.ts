import { BaseService } from './base.service';
import { BibleReading } from '../../domain/entities/bibleReading.entity';
import prisma from '../../../prisma/client/prisma.service';

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
            texts: prismaBibleReading.texts
        });
    }

    async findAll(): Promise<BibleReading[]> {
        const readings = await super.findAll();
        return readings.map(reading => this.prismaToModel(reading));
    }

    async findById(id: number): Promise<BibleReading | null> {
        const reading = await super.findById(id);
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
            where: { date }
        });
        return reading ? this.prismaToModel(reading) : null;
    }

    async findByLanguage(language: string): Promise<BibleReading[]> {
        const readings = await prisma.bibleReading.findMany({
            where: { language }
        });
        return readings.map(reading => this.prismaToModel(reading));
    }
}

export default BibleReadingService.getInstance();