const PaginationComponent = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pageNumbers: number[] = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav
      className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4 m-4"
      aria-label="Table navigation"
    >
      <span className="text-sm font-normal text-gray-500  mb-4 md:mb-0 block w-full md:inline md:w-auto">
        Exibindo{" "}
        <span className="font-semibold text-gray-900">{currentPage}</span> de{" "}
        <span className="font-semibold text-gray-900">{totalPages}</span>
      </span>
      <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={`page-item ${
              number === currentPage ? "bg-blue-600 text-white" : ""
            }`}
          >
            <button
              onClick={() => onPageChange(number)}
              className={`flex items-center justify-center px-3 h-8 leading-tight ${
                number === currentPage
                  ? "bg-blue-600 text-white "
                  : "text-gray-500 bg-white border hover:bg-gray-100 hover:text-gray-700"
              } border-gray-300   `}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default PaginationComponent;
