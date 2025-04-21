export class Reading_FR {
    id: number;
    weekday: string;
    date: string;
    label?: string;
    theme: string;
    text: string[];

    constructor(data: Partial<Reading_FR>) {
        this.id = data.id || 0;
        this.weekday = data.weekday || '';
        this.date = data.date || '';
        this.label = data.label;
        this.theme = data.theme || '';
        this.text = data.text || [];
    }
}