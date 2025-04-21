import { BaseService } from './base.service';
import { Media } from '../../domain/entities/media';
import prisma from '../../../prisma/client/prisma.service';

export class MediaService extends BaseService<Media> {
    constructor() {
        super(prisma.media);
    }

    private prismaToModel(prismaMedia: any): Media {
        return new Media({
            id: prismaMedia.id,
            type: prismaMedia.type,
            url: prismaMedia.url,
            title: prismaMedia.title,
            description: prismaMedia.description
        });
    }

    async findAll(): Promise<Media[]> {
        const media = await super.findAll();
        return media.map(item => this.prismaToModel(item));
    }

    async findById(id: number): Promise<Media | null> {
        const media = await super.findById(id);
        return media ? this.prismaToModel(media) : null;
    }

    async findByType(type: string): Promise<Media[]> {
        const media = await prisma.media.findMany({
            where: { type }
        });
        return media.map(item => this.prismaToModel(item));
    }

    async findByTitle(title: string): Promise<Media[]> {
        const media = await prisma.media.findMany({
            where: { title }
        });
        return media.map(item => this.prismaToModel(item));
    }
} 