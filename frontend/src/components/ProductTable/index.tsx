import PaginationComponent from "components/Pagination";

interface Props {
  items: any[];
  currentPage: number;
  totalPages: number;
  onPageChange:(n: number)=>void;
}

const ProductTableComponent = (props: Props) => {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">
              Nome
            </th>
            <th scope="col" className="px-6 py-3">
              Descrição
            </th>
            <th scope="col" className="px-6 py-3">
              Preço
            </th>
            <th scope="col" className="px-6 py-3">
              Stock
            </th>
            <th scope="col" className="px-6 py-3">
              <span className="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {props.items.map((e, i) => {
            return (
              <tr key={i} className="bg-white border-b hover:bg-gray-50">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                >
                  {e.name}
                </th>
                <td className="px-6 py-4">{e.description}</td>
                <td className="px-6 py-4">{e.price}</td>
                <td className="px-6 py-4">{e.stock}</td>
                <td className="px-6 py-4 text-right">
                  <a
                    href={"/admin/new-product/"+e.id}
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Edit
                  </a>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <PaginationComponent currentPage={props.currentPage} onPageChange={props.onPageChange} totalPages={props.totalPages}/>
    </div>
  );
};

export default ProductTableComponent;
