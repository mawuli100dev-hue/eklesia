//Route pour contacter l'api
import * as dotenv from "dotenv";
dotenv.config();
import * as read from "../controllers/readingController";

const express = require('express');

const router = express.Router();

router.get('/', read.getAllReading); // Récupérer toutes les lectures
router.get('/search', read.getReadingByDate); // Récupérer une lecture par date
router.get('/:id', read.getReadingById) // Récupérer une lecture par son id

router.post('/', read.createReading); // Créer une nouvelle lecture
router.put('/', read.updateReading); // Mettre à jour une lecture existante
router.delete('/', read.deleteReading); // Supprimer une lecture

export default router;