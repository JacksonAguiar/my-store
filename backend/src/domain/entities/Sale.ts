export class SaleEntity {
    private id?: string;
    private paymentMethod: string;
    private total: number;
    private userId: string;
    private products: { productId: string, quantity: number, price: number }[];
    private status: string;

    constructor(
        status: string,
        paymentMethod: string,
        total: number,
        userId: string,
        products: { productId: string, quantity: number, price: number }[],
        id?: string
    ) {
        this.id = id;
        this.paymentMethod = paymentMethod;
        this.total = total;
        this.userId = userId;
        this.products = products;
        this.status = status;
    }

    getId(): string | undefined {
        return this.id;
    }

    getPaymentMethod(): string {
        return this.paymentMethod;
    }

    getTotal(): number {
        return this.total;
    }

    getUserId(): string {
        return this.userId;
    }

    getProducts(): { productId: string, quantity: number, price: number }[] {
        return this.products;
    }

    getStatus(): string {
        return this.status;
    }

    setId(id: string): void {
        this.id = id;
    }

    setPaymentMethod(paymentMethod: string): void {
        this.paymentMethod = paymentMethod;
    }

    setTotal(total: number): void {
        this.total = total;
    }

    setUserId(userId: string): void {
        this.userId = userId;
    }

    setProducts(products: { productId: string, quantity: number, price: number }[]): void {
        this.products = products;
    }

    setStatus(status: string): void {
        this.status = status;
    }
}
