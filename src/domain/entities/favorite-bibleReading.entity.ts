import { BibleReading } from "./bibleReading.entity";
import { User } from "./user.entity";


export class FavoriteBibleReading {
    id: number;
    userId: number;
    bibleReadingId: number;

    bibleReading?: BibleReading;
    user?: User;

    constructor(data: Partial<FavoriteBibleReading>) {
        this.id = data.id || 0;
        this.userId = data.userId || 0;
        this.bibleReadingId = data.bibleReadingId || 0;
        this.bibleReading = data.bibleReading;
        this.user = data.user
    }
}