//Route pour contacter l'api
import * as dotenv from "dotenv";
dotenv.config();
import * as read from "../controllers/readingController"; // Importation des contrôleurs

import { Router } from "express"; // Importation de Router depuis express
const readingRouter = Router();

readingRouter.get('/', read.getAllReading); // Récupérer toutes les lectures
readingRouter.get('/search', read.getReadingByDate); // Récupérer une lecture par date
readingRouter.get('/:id', read.getReadingById) // Récupérer une lecture par son id

readingRouter.post('/', read.createReading); // Créer une nouvelle lecture
readingRouter.put('/', read.updateReading); // Mettre à jour une lecture existante
readingRouter.delete('/', read.deleteReading); // Supprimer une lecture

export default readingRouter;