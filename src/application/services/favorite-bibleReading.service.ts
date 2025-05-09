import prisma from "../../../prisma/client/prisma.service";
import { FavoriteBibleReading } from "../../domain/entities/favorite-bibleReading.entity";
import { BaseService } from "./base.service";


class FavoriteBibleReadingService extends BaseService<FavoriteBibleReading> {
    private static instance: FavoriteBibleReadingService;
    constructor() {
        super(prisma.bibleText);
    }

    public static getInstance(): FavoriteBibleReadingService {
        if (!FavoriteBibleReadingService.instance) {
            FavoriteBibleReadingService.instance = new FavoriteBibleReadingService();
        }
        return FavoriteBibleReadingService.instance;
    }

    private prismaToModel(prismaFavoriteReading: any): FavoriteBibleReading {
        return new FavoriteBibleReading({
            id: prismaFavoriteReading.id,
            userId: prismaFavoriteReading.userId,
            bibleReadingId: prismaFavoriteReading.bibleReadingId,
            user: prismaFavoriteReading.user,
            bibleReading: prismaFavoriteReading.bibleReading
        });
    }

    async findAll(): Promise<FavoriteBibleReading[]> {
        const favorites = await super.findAll();
        return favorites.map(text => this.prismaToModel(text));
    }

    async findById(id: number): Promise<FavoriteBibleReading | null> {
        const favorite = await super.findById(id);
        return favorite ? this.prismaToModel(favorite) : null;
    }

    async findWithRelations(id: number): Promise<FavoriteBibleReading | null> {
        const favorite = await prisma.favoriteBibleReading.findUnique({
            where: { id },
            include: {
                user: true,
                bibleReading: true
            }
        });
        return favorite ? this.prismaToModel(favorite) : null;
    }

}

export default FavoriteBibleReadingService.getInstance();