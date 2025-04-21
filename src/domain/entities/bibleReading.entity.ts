import { BibleText } from "./bibleText.entity";

export class BibleReading {
    id: number;
    date: Date;
    theme: string;
    description: string;
    language: string;

    // Relations
    texts?: BibleText[];

    constructor(data: Partial<BibleReading>) {
        this.id = data.id || 0;
        this.date = data.date || new Date();
        this.theme = data.theme || '';
        this.description = data.description || '';
        this.language = data.language || '';
        this.texts = data.texts;
    }
} 