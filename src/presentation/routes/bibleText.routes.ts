import { Router } from 'express';
import authenticateToken from '../../application/middlewares/auth';
import bibleTextController from '../controllers/bibleText.controller';

const router = Router();

// Routes protégées par authentification
// router.use(authenticateToken);

// Routes GET
router.get('/', bibleTextController.getAllTexts);
router.get('/:id', bibleTextController.getTextById);
router.get('/:id/relations', bibleTextController.getTextWithRelations);
router.get('/reference/:reference', bibleTextController.getTextsByReference);
router.get('/language/:language', bibleTextController.getTextsByLanguage);

// Routes POST, PUT, DELETE
router.post('/', bibleTextController.createText);
router.put('/:id', bibleTextController.updateText);
router.delete('/:id', bibleTextController.deleteText);

export default router; 