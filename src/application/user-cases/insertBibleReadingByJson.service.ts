import prisma from "../../../prisma/client/prisma.service";
import bibleReadingService from "../services/bibleReading.service";
import bibleTextService from "../services/bibleText.service";

export interface MonthData {
    title: string;
    beginDay: number;
    days: Array<{
        theme: string;
        references: string | string[];
        content?: string; // Contenu du texte biblique
        description?: string;
        id?: number;
    }>;
}

class InsertBibleReadingByJson {
    private static instance: InsertBibleReadingByJson;

    private constructor() { }

    public static getInstance(): InsertBibleReadingByJson {
        if (!InsertBibleReadingByJson.instance) {
            InsertBibleReadingByJson.instance = new InsertBibleReadingByJson();
        }
        return InsertBibleReadingByJson.instance;
    }

    public async execute(data: MonthData[], language: string): Promise<void> {

        for (let i = 0; i < data.length; i++) {
            const monthData = data[i];
            try {
                let day: number = monthData.beginDay - 1;
                const parts = monthData.title.split(' ');
                if (parts.length < 2) throw new Error(`Titre du mois invalide: ${monthData.title}, attendu "Mois Année"`);
                // Extraire le mois et l'année du titre
                const month = parts[0];
                const year = parts[1];
                const monthNumber = this.getMonthNumber(month);

                for (let j = 0; j < monthData.days.length; j++) {
                    const reading = monthData.days[j];
                    day++;
                    const date = new Date(parseInt(year), monthNumber - 1, day);

                    // Créer la lecture biblique
                    const bibleReading = await bibleReadingService.create({
                        date: date,
                        theme: reading.theme,
                        description: reading.description || '',
                        language: language,
                        texts: []
                    });

                    // Traiter les textes bibliques
                    if (Array.isArray(reading.references)) {
                        for (let k = 0; k < reading.references.length; k++) {
                            const textRef = reading.references[k];
                            await bibleTextService.create({
                                reference: textRef,
                                content: reading.content, // Le contenu sera ajouté plus tard
                                language: language,
                                readingId: bibleReading.id
                            });
                        }
                    } else if (reading.references) {
                        await bibleTextService.create({
                            reference: reading.references,
                            content: reading.content, // Le contenu sera ajouté plus tard
                            language: language,
                            readingId: bibleReading.id
                        });
                    }
                }
            } catch (error) {
                console.error(`Erreur lors du traitement des données: ${error}`);
                throw error;
            }
        }
    }

    private getMonthNumber(month: string): number {
        const months: { [key: string]: number } = {
            'JANVIER': 1, 'FEVRIER': 2, 'MARS': 3, 'AVRIL': 4,
            'MAI': 5, 'JUIN': 6, 'JUILLET': 7, 'AOÛT': 8,
            'SEPTEMBRE': 9, 'OCTOBRE': 10, 'NOVEMBRE': 11, 'DECEMBRE': 12
        };
        return months[month.toUpperCase()] || 1;
    }
}

export default InsertBibleReadingByJson.getInstance();