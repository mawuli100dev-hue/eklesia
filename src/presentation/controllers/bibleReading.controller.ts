import bibleReadingService from '../../application/services/bibleReading.service';
import { Response } from 'express';

class BibleReadingController {
    private static instance: BibleReadingController;

    private constructor() { }

    public static getInstance(): BibleReadingController {
        if (!BibleReadingController.instance) {
            BibleReadingController.instance = new BibleReadingController();
        }
        return BibleReadingController.instance;
    }

    public getAllReadings = async (req: any, res: Response): Promise<void> => {
        try {
            const readings = await bibleReadingService.findAll();
            res.status(200).json(readings);
        } catch (error) {
            console.error('Erreur lors de la récupération des lectures:', error);
            res.status(500).json({ error: 'Erreur interne du serveur' });
        }
    }

    public getReadingById = async (req: any, res: Response): Promise<void> => {
        const { id } = req.params;
        try {
            const reading = await bibleReadingService.findById(parseInt(id));
            if (reading) {
                res.status(200).json(reading);
            } else {
                res.status(404).json({ error: 'Lecture non trouvée' });
            }
        } catch (error) {
            console.error('Erreur lors de la récupération de la lecture:', error);
            res.status(500).json({ error: 'Erreur interne du serveur' });
        }
    }

    public getReadingByDate = async (req: any, res: Response): Promise<void> => {
        const { date } = req.params;
        try {
            const reading = await bibleReadingService.findByDate(new Date(date));
            if (reading) {
                res.status(200).json(reading);
            } else {
                res.status(404).json({ error: 'Lecture non trouvée pour cette date' });
            }
        } catch (error) {
            console.error('Erreur lors de la récupération de la lecture par date:', error);
            res.status(500).json({ error: 'Erreur interne du serveur' });
        }
    }

    public getReadingsByMonth = async (req: any, res: Response): Promise<void> => {
        const { month } = req.params;
        try {
            const readings = await bibleReadingService.findByMonth(parseInt(month));
            res.status(200).json(readings);
        } catch (error) {
            console.error('Erreur lors de la récupération des lectures du mois:', error);
            res.status(500).json({ error: 'Erreur interne du serveur' });
        }
    }

    public getReadingsByYear = async (req: any, res: Response): Promise<void> => {
        const { year } = req.params;
        try {
            const readings = await bibleReadingService.findByYear(parseInt(year));
            res.status(200).json(readings);
        } catch (error) {
            console.error('Erreur lors de la récupération des lectures de l\'année:', error);
            res.status(500).json({ error: 'Erreur interne du serveur' });
        }
    }

    public getReadingsByTheme = async (req: any, res: Response): Promise<void> => {
        const { theme } = req.params;
        try {
            const readings = await bibleReadingService.findByTheme(theme);
            res.status(200).json(readings);
        } catch (error) {
            console.error('Erreur lors de la récupération des lectures par thème:', error);
            res.status(500).json({ error: 'Erreur interne du serveur' });
        }
    }

    public getReadingsByLanguage = async (req: any, res: Response): Promise<void> => {
        const { language } = req.params;
        try {
            const readings = await bibleReadingService.findByLanguage(language);
            res.status(200).json(readings);
        } catch (error) {
            console.error('Erreur lors de la récupération des lectures par langue:', error);
            res.status(500).json({ error: 'Erreur interne du serveur' });
        }
    }

    public createReading = async (req: any, res: Response): Promise<void> => {
        const { date, theme, description, language, texts } = req.body;
        try {
            const reading = await bibleReadingService.create({
                date: new Date(date),
                theme,
                description,
                language,
                texts
            });
            console.log('Lecture biblique créée avec succès:', reading);
            res.status(201).json(reading);
        } catch (error) {
            console.error('Erreur lors de la création de la lecture:', error);
            res.status(500).json({ error: 'Erreur interne du serveur' });
        }
    }

    public updateReading = async (req: any, res: Response): Promise<void> => {
        const { id } = req.params;
        const { date, theme, description, language, texts } = req.body;
        try {
            const reading = await bibleReadingService.update(parseInt(id), {
                date: date ? new Date(date) : undefined,
                theme,
                description,
                language,
                texts
            });
            if (reading) {
                console.log('Lecture biblique mise à jour avec succès:', reading);
                res.status(200).json(reading);
            } else {
                console.log('Lecture biblique non trouvée');
                res.status(404).json({ error: 'Lecture biblique non trouvée' });
            }
        } catch (error) {
            console.error('Erreur lors de la mise à jour de la lecture:', error);
            res.status(500).json({ error: 'Erreur interne du serveur' });
        }
    }

    public deleteReading = async (req: any, res: Response): Promise<void> => {
        const { id } = req.params;
        try {
            const deleted = await bibleReadingService.delete(parseInt(id));
            if (deleted) {
                console.log('Lecture biblique supprimée avec succès');
                res.status(200).json({ message: 'Lecture biblique supprimée avec succès' });
            } else {
                console.log('Lecture biblique non trouvée');
                res.status(404).json({ error: 'Lecture biblique non trouvée' });
            }
        } catch (error) {
            console.error('Erreur lors de la suppression de la lecture:', error);
            res.status(500).json({ error: 'Erreur interne du serveur' });
        }
    }
}

export default BibleReadingController.getInstance(); 