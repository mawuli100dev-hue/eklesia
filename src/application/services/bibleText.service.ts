import { BaseService } from './base.service';
import prisma from '../../../prisma/client/prisma.service';
import { BibleText } from '../../domain/entities/BibleText';

export class BibleTextService extends BaseService<BibleText> {
    constructor() {
        super(prisma.bibleText);
    }

    private prismaToModel(prismaBibleText: any): BibleText {
        return new BibleText({
            id: prismaBibleText.id,
            reference: prismaBibleText.reference,
            content: prismaBibleText.content,
            language: prismaBibleText.language,
            readingId: prismaBibleText.readingId || undefined,
            bibleReading: prismaBibleText.bibleReading
        });
    }

    async findAll(): Promise<BibleText[]> {
        const texts = await super.findAll();
        return texts.map(text => this.prismaToModel(text));
    }

    async findById(id: number): Promise<BibleText | null> {
        const text = await super.findById(id);
        return text ? this.prismaToModel(text) : null;
    }

    async findWithRelations(id: number): Promise<BibleText | null> {
        const text = await prisma.bibleText.findUnique({
            where: { id },
            include: {
                bibleReading: true
            }
        });
        return text ? this.prismaToModel(text) : null;
    }

    async findByReference(reference: string): Promise<BibleText[]> {
        const texts = await prisma.bibleText.findMany({
            where: { reference }
        });
        return texts.map(text => this.prismaToModel(text));
    }

    async findByLanguage(language: string): Promise<BibleText[]> {
        const texts = await prisma.bibleText.findMany({
            where: { language }
        });
        return texts.map(text => this.prismaToModel(text));
    }
} 