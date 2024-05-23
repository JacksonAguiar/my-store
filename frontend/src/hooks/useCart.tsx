import { createContext, ReactNode, useContext, useState } from "react";
import { toast } from "react-toastify";
import ProductService from "services/ProductsService";
import { IProduct } from "types/interfaces";
// import { api } from '../services/api';

export interface Stock {
  id: number;
  amount: number;
}

interface CartProviderProps {
  children: ReactNode;
}

interface UpdateProductAmount {
  productId: String;
  amount: number;
}

interface CartContextData {
  cart: IProduct[];
  addProduct: (productId: String) => Promise<void>;
  clearCart: () => void;
  removeProduct: (productId: String) => void;
  updateProductAmount: ({ productId, amount }: UpdateProductAmount) => void;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

export function CartProvider({ children }: CartProviderProps): JSX.Element {
  const [cart, setCart] = useState<IProduct[]>(() => {
    const storagedCart = localStorage.getItem("@app:cart");

    if (storagedCart) {
      return JSON.parse(storagedCart);
    }

    return [];
  });

  const addProduct = async (productId: String) => {
    try {
      const service = new ProductService();
      const productAlreadyExists = cart.find(
        (product) => product.id === productId
      );

      const product = await service.getProductById(productId);

      if (productAlreadyExists) {
        const { amount: productAmount } = productAlreadyExists;

        const newAmount = productAmount ? productAmount + 1 : 1;
        const productIsAvailableInStock = product.stock > newAmount;

        if (!productIsAvailableInStock) {
          toast.error("Quantidade solicitada fora de estoque");

          return;
        }

        const updatedAmountCartProduct = cart.map((product) => {
          return product.id === productId
            ? { ...product, amount: newAmount }
            : product;
        });

        setCart(updatedAmountCartProduct);

        localStorage.setItem(
          "@app:cart",
          JSON.stringify(updatedAmountCartProduct)
        );

        return;
      }

      const cartWithNewProduct = [...cart, { ...product, amount: 1 }];

      setCart(cartWithNewProduct);

      localStorage.setItem("@app:cart", JSON.stringify(cartWithNewProduct));
    } catch {
      toast.error("Erro na adição do produto");
    }
  };

  const removeProduct = (productId: String) => {
    try {
      const productAlreadyExists = cart.find(
        (product) => product.id === productId
      );

      if (!productAlreadyExists) throw Error();

      const filteredCart = cart.filter((product) => product.id !== productId);

      setCart(filteredCart);

      localStorage.setItem("@app:cart", JSON.stringify(filteredCart));
    } catch {
      toast.error("Erro na remoção do produto");
    }
  };
  const clearCart = () => {
    try {
      setCart([]);

      localStorage.setItem("@app:cart", JSON.stringify([]));
    } catch {
      toast.error("Erro ao limpar carrinho");
    }
  };

  const updateProductAmount = async ({
    productId,
    amount,
  }: UpdateProductAmount) => {
    try {
      if (amount < 1) return;
      const service = new ProductService();

      const data = await service.getProductById(productId);

      const productIsAvailableInStock = data.stock >= amount;

      if (!productIsAvailableInStock) {
        toast.error("Quantidade solicitada fora de estoque");

        return;
      }

      const productAlreadyExists = cart.find(
        (product) => product.id === productId
      );

      if (!productAlreadyExists) throw Error();

      const updatedAmountCartProduct = cart.map((product) => {
        return product.id === productId ? { ...product, amount } : product;
      });

      setCart(updatedAmountCartProduct);

      localStorage.setItem(
        "@app:cart",
        JSON.stringify(updatedAmountCartProduct)
      );
    } catch {
      toast.error("Erro na alteração de quantidade do produto");
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addProduct,
        removeProduct,
        updateProductAmount,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextData {
  const context = useContext(CartContext);

  return context;
}
