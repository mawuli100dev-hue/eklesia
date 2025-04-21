export class Media {
    id: number;
    type: string;
    url: string;
    title: string;
    description: string;

    constructor(data: Partial<Media>) {
        this.id = data.id || 0;
        this.type = data.type || '';
        this.url = data.url || '';
        this.title = data.title || '';
        this.description = data.description || '';
    }
} 