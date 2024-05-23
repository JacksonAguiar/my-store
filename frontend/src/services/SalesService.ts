import { ISaleProduct } from "types/interfaces";
import { AppFetch } from "./fetcher";

class SalesService {
    apiUrl;
    constructor() {
        this.apiUrl = "/sales";
    }

    async createSale(paymentMethod: string, products: ISaleProduct[], total: number, userId: string) {

        try {
            const response = await AppFetch(this.apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({paymentMethod, products, total, userId}),
            });
            return await response.json();
        } catch (error) {
            console.error('Error creating sale:', error);
            throw error;
        }
    }

    async fetchSales(p:number=1, limit:number=10) {
        try {
            const response = await AppFetch(`${this.apiUrl}/?p=${p}&limit=${limit}`, {
                method: 'GET',
            });
            return await response.json();
        } catch (error) {
            console.error('Error fetching sales:', error);
            throw error;
        }
    }

    async processPayment(id) {
        try {
            await AppFetch(`${this.apiUrl}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            // return await response.json();
        } catch (error) {
            console.error(`Error processing payment for sale ${id}:`, error);
            throw error;
        }
    }

    async getPaymentSource(id) {
        try {
            const response = await AppFetch(`${this.apiUrl}/source/${id}`, {
                method: 'GET',
            });
            return await response.json();
        } catch (error) {
            console.error(`Error getting payment source for sale ${id}:`, error);
            throw error;
        }
    }
}

export default SalesService;
