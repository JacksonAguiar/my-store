import ProductTableComponent from "components/ProductTable";
import { useAuth } from "hooks/useAuth";
import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProductService from "services/ProductsService";

export default function AdminProductsPage() {
  const nav = useNavigate();
  const { signOut } = useAuth();
  const [products, setProducts] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchProducts = useCallback(async () => {
    const service = new ProductService();
    const data = await service.getProducts(currentPage);
    setProducts(data.docs);
    setTotalPages(data.totalPages);
  }, [currentPage]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

const handlePageChange = pageNumber => {
    setCurrentPage(pageNumber);
  };

  return (
    <section className="p-10">
      <header className="flex justify-between items-center">
        <h1 className="font-bold mb-6 text-xl">Lista de produtos</h1>
        <div>
          <Link to={"/admin/history"} className="underline">
            Histórico de compras
          </Link>
          <button
            onClick={() => nav("/admin/new-product")}
            type="button"
            className="m-0 ml-4 text-white bg-blue-700 hover:bg-grey-200 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 "
          >
            Adicionar novo produto
          </button>
        </div>
      </header>
      <ProductTableComponent items={products} currentPage={currentPage} onPageChange={handlePageChange} totalPages={totalPages}/>
      <button onClick={signOut} className="absolute right-6 bottom-6 m-0 ml-4 text-white bg-red-700 hover:bg-grey-200 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 ">
        Sair
      </button>
    </section>
  );
}
