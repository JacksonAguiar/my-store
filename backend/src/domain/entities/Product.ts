export class ProductEntity {
    private id: string;
    private name: string;
    private description: string;
    private image: string;
    private price: number;
    private stock: number;

    constructor(id: string | undefined,name: string, price: number, description:string,stock: number,image?: string ) {
      
        this.id = id ?? "";
        this.name = name;
        this.price = price;
        this.description = description;
        this.image = image || "";
        this.stock = stock;
    }

    getId(): string {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    getPrice(): number {
        return this.price;
    }
    getDescription(): string {
        return this.description;
    }
    getStock(): number {
        return this.stock;
    }
    getImage(): string {
        return this.image;
    }
}
