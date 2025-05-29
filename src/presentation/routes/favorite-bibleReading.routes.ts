import { Router } from 'express';
import authenticateToken from '../../application/middlewares/auth';
import favoriteBibleReadingController from '../controllers/favorite-bibleReading.controller';

const router = Router();

// Routes protégées par authentification
// router.use(authenticateToken);

// Routes GET
router.get('/', favoriteBibleReadingController.getAllFavorites);
router.get('/:id', favoriteBibleReadingController.getFavoriteById);
router.get('/:id/relations', favoriteBibleReadingController.getFavoriteWithRelations);
router.get('/user/:userId', favoriteBibleReadingController.getFavoritesByUserId);
router.get('/user/:userId/with-readings', favoriteBibleReadingController.getFavoritesByUserIdWithBibleReading);

// Routes POST, DELETE
router.post('/', favoriteBibleReadingController.createFavorite);
router.delete('/:id', favoriteBibleReadingController.deleteFavorite);

export default router; 