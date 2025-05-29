import bibleTextService from '../../application/services/bibleText.service';
import { Response } from 'express';

class BibleTextController {
    private static instance: BibleTextController;

    private constructor() { }

    public static getInstance(): BibleTextController {
        if (!BibleTextController.instance) {
            BibleTextController.instance = new BibleTextController();
        }
        return BibleTextController.instance;
    }

    public getAllTexts = async (req: any, res: Response): Promise<void> => {
        try {
            const texts = await bibleTextService.findAll();
            res.status(200).json(texts);
        } catch (error) {
            console.error('Erreur lors de la récupération des textes:', error);
            res.status(500).json({ error: 'Erreur interne du serveur' });
        }
    }

    public getTextById = async (req: any, res: Response): Promise<void> => {
        const { id } = req.params;
        try {
            const text = await bibleTextService.findById(parseInt(id));
            if (text) {
                res.status(200).json(text);
            } else {
                res.status(404).json({ error: 'Texte non trouvé' });
            }
        } catch (error) {
            console.error('Erreur lors de la récupération du texte:', error);
            res.status(500).json({ error: 'Erreur interne du serveur' });
        }
    }

    public getTextWithRelations = async (req: any, res: Response): Promise<void> => {
        const { id } = req.params;
        try {
            const text = await bibleTextService.findWithRelations(parseInt(id));
            if (text) {
                res.status(200).json(text);
            } else {
                res.status(404).json({ error: 'Texte non trouvé' });
            }
        } catch (error) {
            console.error('Erreur lors de la récupération du texte avec relations:', error);
            res.status(500).json({ error: 'Erreur interne du serveur' });
        }
    }

    public getTextsByReference = async (req: any, res: Response): Promise<void> => {
        const { reference } = req.params;
        try {
            const texts = await bibleTextService.findByReference(reference);
            res.status(200).json(texts);
        } catch (error) {
            console.error('Erreur lors de la récupération des textes par référence:', error);
            res.status(500).json({ error: 'Erreur interne du serveur' });
        }
    }

    public getTextsByLanguage = async (req: any, res: Response): Promise<void> => {
        const { language } = req.params;
        try {
            const texts = await bibleTextService.findByLanguage(language);
            res.status(200).json(texts);
        } catch (error) {
            console.error('Erreur lors de la récupération des textes par langue:', error);
            res.status(500).json({ error: 'Erreur interne du serveur' });
        }
    }

    public createText = async (req: any, res: Response): Promise<void> => {
        const { reference, content, language, readingId } = req.body;
        try {
            const text = await bibleTextService.create({
                reference,
                content,
                language,
                readingId
            });
            console.log('Texte biblique créé avec succès:', text);
            res.status(201).json(text);
        } catch (error) {
            console.error('Erreur lors de la création du texte:', error);
            res.status(500).json({ error: 'Erreur interne du serveur' });
        }
    }

    public updateText = async (req: any, res: Response): Promise<void> => {
        const { id } = req.params;
        const { reference, content, language, readingId } = req.body;
        try {
            const text = await bibleTextService.update(parseInt(id), {
                reference,
                content,
                language,
                readingId
            });
            if (text) {
                console.log('Texte biblique mis à jour avec succès:', text);
                res.status(200).json(text);
            } else {
                console.log('Texte biblique non trouvé');
                res.status(404).json({ error: 'Texte biblique non trouvé' });
            }
        } catch (error) {
            console.error('Erreur lors de la mise à jour du texte:', error);
            res.status(500).json({ error: 'Erreur interne du serveur' });
        }
    }

    public deleteText = async (req: any, res: Response): Promise<void> => {
        const { id } = req.params;
        try {
            const deleted = await bibleTextService.delete(parseInt(id));
            if (deleted) {
                console.log('Texte biblique supprimé avec succès');
                res.status(200).json({ message: 'Texte biblique supprimé avec succès' });
            } else {
                console.log('Texte biblique non trouvé');
                res.status(404).json({ error: 'Texte biblique non trouvé' });
            }
        } catch (error) {
            console.error('Erreur lors de la suppression du texte:', error);
            res.status(500).json({ error: 'Erreur interne du serveur' });
        }
    }
}

export default BibleTextController.getInstance(); 