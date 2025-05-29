import { BaseService } from './base.service';
import prisma from '../../../prisma/client/prisma.service';
import { BibleText } from '../../domain/entities/bibleText.entity';
import { Prisma } from '@prisma/client';

class BibleTextService extends BaseService<BibleText> {
    private static instance: BibleTextService;
    constructor() {
        super(prisma.bibleText);
    }

    public static getInstance(): BibleTextService {
        if (!BibleTextService.instance) {
            BibleTextService.instance = new BibleTextService();
        }
        return BibleTextService.instance;
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

    async create(data: Partial<BibleText>): Promise<BibleText> {
        const { bibleReading, id, ...textData } = data;
        if (!textData.reference) {
            throw new Error('Reference est obligatoire pour créer un texte biblique');
        }
        const text = await prisma.bibleText.create({
            data: textData as Prisma.BibleTextCreateInput,
        });
        return this.prismaToModel(text);
    }
}

export default BibleTextService.getInstance();