// Importation des dépendances nécessaires
import * as dotenv from "dotenv";
dotenv.config();
import { Request, Response } from "express"; // Import des types pour req et res
import lectureManager from "../../application/services/readingService";

// Exemple de valeurs par défaut pour `jour` et `titre` (à adapter selon votre logique)
const defaultJour = {
    id: 0,
    weekday: "",
    date: "",
    theme: "",
    label: "",
    text: ""
};
const defaultTitre = "Default Title";

// Initialisation du manager
const manager = new lectureManager(defaultJour, defaultTitre);

// Création de la lecture dans la DB
const createReading = async (req: Request, res: Response) => {
    const jour = req.body; // Extraction de `jour` depuis le corps de la requête
    try {
        const data = await manager.createReading(jour);
        res.status(201).json(data);
    } catch (error) {
        console.error("Error creating data:", error);
        res.status(500).json({ error: "Error server" });
    }
};

// Récupartion de toutes les données de la DB
const getAllReading = async (req: Request, res: Response) => {
    try {
        const data = await manager.getAllReading();
        res.status(200).json(data);
    } catch (error) {
        console.error("Erreur de récupération:", error);
        res.status(500).json({ error: "Error server" });
    }
}

// Récupération d'une lecture par sa date 
const getReadingByDate = async (req: Request, res: Response) => {
    const jour = req.body; // Extraction de `jour` depuis le corps de la requête
    try {
        const data = await manager.getReadingByDate(jour);
        res.status(200).json(data);
    } catch (error) {
        console.error("Erreur de récupération:", error);
        res.status(500).json({ error: "Error server." });
    }
}

const getReadingById = async (req: Request, res: Response) => {
    const jour = req.params;
    const id = Number(jour.id)
    try {
        const data = await manager.getReadingById(id)
        res.status(200).json(data);
    } catch (error) {
        console.error("Erreur de récupération:", error);
        res.status(500).json({ error: "Error server." });
    }
}

const updateReading = async (req: Request, res: Response) => {
    const jour = req.body; // Extraction de `jour` depuis le corps de la requête
    try {
        const data = await manager.updateReading(jour);
        res.status(205).json(data);
    } catch (error) {
        console.error("Error updating data", error);
        res.status(500).json({ error: "Error server" });
    }
}

const deleteReading = async (req: Request, res: Response) => {
    const jour = req.body; // Extraction de `jour` depuis le corps de la requête
    try {
        const data = await manager.deleteReading(jour);
        res.status(202).json(data);
    } catch (error) {
        console.error("Erreur de suppression:", error);
        res.status(500).json({ error: "Error server." });

    }
}

export {
    createReading,
    getAllReading,
    getReadingByDate,
    getReadingById,
    updateReading,
    deleteReading
};