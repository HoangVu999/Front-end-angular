export class Category {
    id: number;
    name: string;
    books?: any[];
    constructor(id: number, name: string, books: any[] = []) {
        this.id = id;
        this.name = name;
        this.books = books;
    }
}
