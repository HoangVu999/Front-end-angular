export class Book {
    id: number;
    title: string;
    price: number;
    image: string;
    short_desc: string;
    detail: string;
    categories?: any[];
    authors?: any[];
    constructor(id: number, title: string, price: number, image: string,
                short_desc: string, detail: string,
                authors: any[] = [], categories: any[] = []) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.image = image;
        this.short_desc = short_desc;
        this.detail = detail;
        this.authors = authors;
        this.categories = categories;
    }
}
