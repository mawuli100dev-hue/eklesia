import favoriteBibleReadingService from '../../application/services/favorite-bibleReading.service';


class FavoriteBibleReadingController {
    private static instance: FavoriteBibleReadingController;
    constructor() {

    }

    public static getInstance(): FavoriteBibleReadingController {
        if (!FavoriteBibleReadingController.instance) {
            FavoriteBibleReadingController.instance = new FavoriteBibleReadingController();
        }
        return FavoriteBibleReadingController.instance;
    }

    // Method to handle favorite Bible reading
    public handleFavoriteReading = async (req: any, res: Response): Promise<void> => {
        const { userId, bibleReadingId } = req.body;

        try {
            const favorite = await favoriteBibleReadingService.create({
                userId,
                bibleReadingId
            });

            console.log('✅ Favorite Bible reading created successfully:', favorite);
            res.status(201).json(favorite);
        } catch (error) {
            console.error('Error creating favorite Bible reading:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    public deleteFavoriteReading = async (req: any, res: Response): Promise<void> => {
        const { id } = req.params;

        try {
            const deletedFavorite = await favoriteBibleReadingService.delete(id);
            if (deletedFavorite) {
                console.log('✅ Favorite Bible reading deleted successfully:', deletedFavorite);
                res.status(200).json({ message: 'Favorite Bible reading deleted successfully' });
            } else {
                console.log('❌ Favorite Bible reading not found');
                res.status(404).json({ error: 'Favorite Bible reading not found' });
            }
        } catch (error) {
            console.error('Error deleting favorite Bible reading:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

}

export default FavoriteBibleReadingController.getInstance();