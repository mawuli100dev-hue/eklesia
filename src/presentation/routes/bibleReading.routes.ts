import { Router } from 'express';
import authenticateToken from '../../application/middlewares/auth';
import bibleReadingController from '../controllers/bibleReading.controller';

const router = Router();

// Routes protégées par authentification
// router.use(authenticateToken);

// Routes GET
router.get('/', bibleReadingController.getAllReadings);
router.get('/:id', bibleReadingController.getReadingById);
router.get('/date/:date', bibleReadingController.getReadingByDate);
router.get('/month/:month', bibleReadingController.getReadingsByMonth);
router.get('/year/:year', bibleReadingController.getReadingsByYear);
router.get('/theme/:theme', bibleReadingController.getReadingsByTheme);
router.get('/language/:language', bibleReadingController.getReadingsByLanguage);

// Routes POST, PUT, DELETE
router.post('/', bibleReadingController.createReading);
router.put('/:id', bibleReadingController.updateReading);
router.delete('/:id', bibleReadingController.deleteReading);

export default router; 