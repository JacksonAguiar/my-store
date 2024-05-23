import CardProductComponent from "components/CardProduct";
import { useCart } from "hooks/useCart";
import { ShoppingCart } from "lucide-react";
import { IProduct } from "types/interfaces";
import { useNavigate } from "react-router-dom";
import { useAuth } from "hooks/useAuth";
import { useCallback, useEffect, useState } from "react";
import ProductService from "services/ProductsService";
import PaginationComponent from "components/Pagination";

export default function ProductsPage() {
  const navigate = useNavigate();
  const { cart, addProduct } = useCart();
  const { signOut } = useAuth();

  const [products, setProducts] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchProducts = useCallback(async () => {
    const service = new ProductService();
    const data = await service.getProducts(currentPage);
    setProducts(data.docs);
    setTotalPages(data.totalPages);
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts, currentPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="p-6">
      <header className="flex justify-between items-center">
        <h1 className="font-bold text-2xl">Produtos</h1>
        <div>
          <button
            className="hover:opacity-60 relative"
            onClick={() => navigate("/cart")}
          >
            <ShoppingCart className="" />
            <div className="absolute -top-1 -right-2 rounded-full bg-red-600 transition-colors opacity-80 text-white text-sm w-5 h-5">
              {cart.length}
            </div>
          </button>

          <button onClick={signOut} className="underline ml-8">
            Sair
          </button>
        </div>
      </header>
      <div className="grid grid-cols-4 gap-4 mt-6">
        {products.map((e, i) => {
          return (
            <CardProductComponent
              product={e}
              key={i}
              onClick={() => addProduct(e.id!)}
            />
          );
        })}
      </div>
      <footer>
        <PaginationComponent
          currentPage={currentPage}
          onPageChange={handlePageChange}
          totalPages={totalPages}
        />
      </footer>
    </div>
  );
}
