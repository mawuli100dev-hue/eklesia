
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


interface lecture {
    id: number;
    weekday: string;
    date: string;
    theme: string;
    label: string;
    text: string | string[];
}

interface fixData {
    date: string;
}

class lectureManager {
    lec: lecture;
    titre: string;
    data: fixData;
    constructor(lec: lecture, titre: string) {
        this.titre = titre;
        this.lec = lec;
        this.data = {
            date: ""
        }
    }
    async getAllReading() {
        return await prisma.reading_FR.findMany({
            select: {
                id: true,
                weekday: true,
                date: true,
                label: true,
                theme: true,
                text: true
            }
        })
    }
    async getReadingByDate(data: fixData) {
        return await prisma.reading_FR.findFirst({
            where: {
                date: data.date
            },
            select: {
                id: true,
                weekday: true,
                date: true,
                label: true,
                theme: true,
                text: true
            }
        });
    }
    async getReadingById(id: number) {
        return await prisma.reading_FR.findUnique({
            where: { id: id },
            select: {
                id: true,
                weekday: true,
                date: true,
                label: true,
                theme: true,
                text: true
            }
        })
    }
    async createReading(jour: lecture) {
        const mydata: fixData = {
            date: jour.date
        }
        this.getReadingByDate(mydata).then((lecture) => {
            if (!lecture) {
                let texte = typeof jour.text === 'string' ? [jour.text] : jour.text;
                const data = prisma.reading_FR.create({
                    data: {
                        weekday: jour.weekday,
                        date: jour.date,
                        label: jour.label,
                        theme: jour.theme,
                        text: texte
                    }
                }); return data
            } else {
                console.log("Lecture already exist in database.");
            }
        })
    }
    async updateReading(jour: lecture) {
        const mydata: fixData = {
            date: jour.date
        }
        this.getReadingByDate(mydata).then((lecture) => {
            if (lecture) {
                let texte = typeof jour.text === 'string' ? [jour.text] : jour.text;
                return prisma.reading_FR.update({
                    where: { id: lecture.id }, data: {
                        weekday: jour.weekday,
                        date: jour.date,
                        label: jour.label,
                        theme: jour.theme,
                        text: texte
                    }
                });
            } else {
                console.log("Lecture not found for the given date and month.");
            }
        })
    }
    async deleteReading(data: fixData) {
        this.getReadingByDate(data).then((lecture) => {
            if (lecture) {
                return prisma.reading_FR.delete({ where: { id: lecture.id } });
            } else {
                console.log("Reading not found for the given date and month.");
            }
        })
    }
}


export default lectureManager