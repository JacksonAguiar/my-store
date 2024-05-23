import TableComponent from "components/HistoryTable";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SalesService from "services/SalesService";

export default function HistoryPage() {
  const [sales, setSales] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchAllSales = useCallback(async () => {
    const service = new SalesService();
    const data = await service.fetchSales(currentPage);
    setSales(data.docs);
    setTotalPages(data.totalPages);
  }, [currentPage]);

  useEffect(() => {
    fetchAllSales();
  }, [fetchAllSales, currentPage]);

  const handlePageChange = pageNumber => {
    setCurrentPage(pageNumber);
  };

  return (
    <section className="p-10">
      <Link to={"/admin/products"} className="underline mb-6">
        Voltar
      </Link>
      <h1 className="font-bold text-xl mb-6">Histórico de compras</h1>

      <TableComponent items={sales} currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange}/>
    </section>
  );
}
