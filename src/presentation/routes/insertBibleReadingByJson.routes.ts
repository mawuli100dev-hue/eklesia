import { Router } from 'express';
import authenticateToken from '../../application/middlewares/auth';
import insertBibleReadingByJsonController from '../controllers/insertBibleReadingByJson.controller';

const router = Router();

// Routes protégées par authentification
// router.use(authenticateToken);

// Route POST pour l'insertion des lectures
router.post('/', insertBibleReadingByJsonController.insertReadings);

export default router; 