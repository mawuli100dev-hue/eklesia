import * as dotenv from "dotenv";
dotenv.config();
import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';

const prisma = new PrismaClient();

interface lecture {
    id: number;
    day: string;
    date: string;
    theme: string;
    label: string;
    text: string | string[];
}

class lectureManager {
    lec: lecture;
    titre: string;
    constructor(lec: lecture, titre: string) {
        this.titre = titre;
        this.lec = lec;
    }
    async createReading(jour: lecture) {
        let texte = typeof jour.text === 'string' ? [jour.text] : jour.text;
       try {
            await prisma.reading_FR.create({ data: {
                weekday: jour.day,
                date: String(jour.id) + ' ' + this.titre,
                label: jour.label,
                theme: jour.theme,
                text: texte
            } });
            console.log("Données insérées avec succès");
       } catch (error) {
            console.error("Erreur lors de l'insertion des données :", error);
        }
        
       }
    }

const fileName: string = './lectio/aoû.json'
fs.readFile(fileName, 'utf8', (err, data)=> {
    //console.log(data);

    const jsonData = JSON.parse(data); // Convertir en objet JavaScript
    const read = jsonData.days
    const title = jsonData.title
    
    for (let i = 0; i < read.length; i++) {
        const manager = new lectureManager(read[i], title);
        manager.createReading(read[i]);
    }
});

