import { BibleReading } from './BibleReading';

export class BibleText {
    id: number;
    reference: string;
    content: string;
    language: string;

    // Relations
    readingId?: number;
    bibleReading?: BibleReading;

    constructor(data: Partial<BibleText>) {
        this.id = data.id || 0;
        this.reference = data.reference || '';
        this.content = data.content || '';
        this.language = data.language || '';
        this.readingId = data.readingId;
        this.bibleReading = data.bibleReading;
    }
} 