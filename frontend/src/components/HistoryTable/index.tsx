import PaginationComponent from "components/Pagination";

interface Props {
  items: any[];
  currentPage: number;
  totalPages: number;
  onPageChange:(n: number)=>void;
}

const HistoryTableComponent = (props: Props) => {
  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
          <tr>
            <th scope="col" className="px-6 py-3">
              Produtos
            </th>
            <th scope="col" className="px-6 py-3">
              Comprador
            </th>
            <th scope="col" className="px-6 py-3">
              Metodo de pagamento
            </th>
            <th scope="col" className="px-6 py-3">
              Valor
            </th>
      
          </tr>
        </thead>
        <tbody>
          {props.items.map((e, i) => {
            return (
              <tr key={i} className="bg-white border-b ">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                >
                  {(e.products as []).join(",")}
                </th>
                <td className="px-6 py-4">{e.customer}</td>
                <td className="px-6 py-4">{getMethodName(e.paymentMethod)}</td>
                <td className="px-6 py-4">R$ {e.total}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <PaginationComponent currentPage={props.currentPage} onPageChange={props.onPageChange} totalPages={props.totalPages}/>
    </div>
  );
};

const getMethodName = (name)=>{
  switch (name) {
    case "credit_card":
      return "Cartão de crédito"
     
    case "pix":
      return "Pix"
     
    case "bill":
      return "Boleto"
    default:
      break;
  }
}
export default HistoryTableComponent;
