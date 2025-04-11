"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//Route pour contacter l'api
var dotenv = require("dotenv");
dotenv.config();
var read = require("../controllers/readingController");
var express = require('express');
var router = express.Router();
router.get('/', read.getAllReading); // Récupérer toutes les lectures
router.get('/search', read.getReadingByDate); // Récupérer une lecture par date
router.get('/:id', read.getReadingById); // Récupérer une lecture par son id
router.post('/', read.createReading); // Créer une nouvelle lecture
router.put('/', read.updateReading); // Mettre à jour une lecture existante
router.delete('/', read.deleteReading); // Supprimer une lecture
exports.default = router;
