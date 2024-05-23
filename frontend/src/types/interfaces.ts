export interface IProduct {
  id: string | null;
  name: string;
  description: string;
  image:string | null;
  price: number;
  amount?: number;
  stock: number;
}
export interface ISaleProduct {
  price: number;
  productId: string;
  quantity: number;
}

