import favoriteBibleReadingService from '../../application/services/favorite-bibleReading.service';
import { Response } from 'express';

class FavoriteBibleReadingController {
    private static instance: FavoriteBibleReadingController;

    private constructor() { }

    public static getInstance(): FavoriteBibleReadingController {
        if (!FavoriteBibleReadingController.instance) {
            FavoriteBibleReadingController.instance = new FavoriteBibleReadingController();
        }
        return FavoriteBibleReadingController.instance;
    }

    public getAllFavorites = async (req: any, res: Response): Promise<void> => {
        try {
            const favorites = await favoriteBibleReadingService.findAll();
            res.status(200).json(favorites);
        } catch (error) {
            console.error('Erreur lors de la récupération des favoris:', error);
            res.status(500).json({ error: 'Erreur interne du serveur' });
        }
    }

    public getFavoriteById = async (req: any, res: Response): Promise<void> => {
        const { id } = req.params;
        try {
            const favorite = await favoriteBibleReadingService.findById(parseInt(id));
            if (favorite) {
                res.status(200).json(favorite);
            } else {
                res.status(404).json({ error: 'Favori non trouvé' });
            }
        } catch (error) {
            console.error('Erreur lors de la récupération du favori:', error);
            res.status(500).json({ error: 'Erreur interne du serveur' });
        }
    }

    public getFavoriteWithRelations = async (req: any, res: Response): Promise<void> => {
        const { id } = req.params;
        try {
            const favorite = await favoriteBibleReadingService.findWithRelations(parseInt(id));
            if (favorite) {
                res.status(200).json(favorite);
            } else {
                res.status(404).json({ error: 'Favori non trouvé' });
            }
        } catch (error) {
            console.error('Erreur lors de la récupération du favori avec relations:', error);
            res.status(500).json({ error: 'Erreur interne du serveur' });
        }
    }

    public getFavoritesByUserId = async (req: any, res: Response): Promise<void> => {
        const { userId } = req.params;
        try {
            const favorites = await favoriteBibleReadingService.findByUserId(parseInt(userId));
            res.status(200).json(favorites);
        } catch (error) {
            console.error('Erreur lors de la récupération des favoris de l\'utilisateur:', error);
            res.status(500).json({ error: 'Erreur interne du serveur' });
        }
    }

    public getFavoritesByUserIdWithBibleReading = async (req: any, res: Response): Promise<void> => {
        const { userId } = req.params;
        try {
            const favorites = await favoriteBibleReadingService.findByUserIdWithBibleReading(parseInt(userId));
            res.status(200).json(favorites);
        } catch (error) {
            console.error('Erreur lors de la récupération des favoris avec lectures:', error);
            res.status(500).json({ error: 'Erreur interne du serveur' });
        }
    }

    public createFavorite = async (req: any, res: Response): Promise<void> => {
        const { userId, bibleReadingId } = req.body;
        try {
            const favorite = await favoriteBibleReadingService.create({
                userId,
                bibleReadingId
            });
            console.log('Favori créé avec succès:', favorite);
            res.status(201).json(favorite);
        } catch (error) {
            console.error('Erreur lors de la création du favori:', error);
            res.status(500).json({ error: 'Erreur interne du serveur' });
        }
    }

    public deleteFavorite = async (req: any, res: Response): Promise<void> => {
        const { id } = req.params;
        try {
            const deleted = await favoriteBibleReadingService.delete(parseInt(id));
            if (deleted) {
                console.log('Favori supprimé avec succès');
                res.status(200).json({ message: 'Favori supprimé avec succès' });
            } else {
                console.log('Favori non trouvé');
                res.status(404).json({ error: 'Favori non trouvé' });
            }
        } catch (error) {
            console.error('Erreur lors de la suppression du favori:', error);
            res.status(500).json({ error: 'Erreur interne du serveur' });
        }
    }
}

export default FavoriteBibleReadingController.getInstance();