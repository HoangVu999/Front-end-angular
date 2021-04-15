export class Author {
    id: number;
    name: string;
    books?: any[];
    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }
}
