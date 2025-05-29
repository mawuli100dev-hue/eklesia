import insertBibleReadingByJsonService from '../../application/user-cases/insertBibleReadingByJson.service';
import { Response } from 'express';
import { MonthData } from '../../application/user-cases/insertBibleReadingByJson.service';

class InsertBibleReadingByJsonController {
    private static instance: InsertBibleReadingByJsonController;

    private constructor() { }

    public static getInstance(): InsertBibleReadingByJsonController {
        if (!InsertBibleReadingByJsonController.instance) {
            InsertBibleReadingByJsonController.instance = new InsertBibleReadingByJsonController();
        }
        return InsertBibleReadingByJsonController.instance;
    }

    public insertReadings = async (req: any, res: Response): Promise<void> => {
        const { data, lang } = req.body;
        if (!data || !lang) {
            res.status(400).json({ error: 'Les données et la langue sont requises' });
            return;
        }
        if (!Array.isArray(data)) {
            res.status(400).json({ error: 'Les données doivent être un tableau de lectures mensuelles' });
            return;
        }

        try {
            await insertBibleReadingByJsonService.execute(data, lang);
            console.log('Lectures bibliques insérées avec succès');
            res.status(201).json({ message: 'Lectures bibliques insérées avec succès' });
        } catch (error) {
            console.error('Erreur lors de l\'insertion des lectures:', error);
            res.status(500).json({
                error: 'Erreur lors de l\'insertion des lectures',
                details: error instanceof Error ? error.message : 'Erreur inconnue'
            });
        }
    }
}

export default InsertBibleReadingByJsonController.getInstance(); 