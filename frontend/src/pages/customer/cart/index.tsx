import { useCart } from "hooks/useCart";
import { ArrowLeft, Minus, Plus } from "lucide-react";

import { useNavigate } from "react-router-dom";

export default function CartPage() {
  const { clearCart, cart, updateProductAmount } = useCart();
  const nav = useNavigate();

  const abandonCart = () => {
    clearCart();
    nav("/");
  };

  return (
    <section className="p-10 flex flex-col w-full h-screen">
      <header>
        <button
          onClick={() => nav("/")}
          className="flex hover:opacity-55 transition-opacity space-x-2 items-center"
        >
          <ArrowLeft size={16} />
          <span>Voltar</span>
        </button>
      </header>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-2/3 m-auto">
        {cart.length !== 0 ? (
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Nome do produto
                </th>
                <th scope="col" className="px-6 py-3">
                  Preço
                </th>
                <th scope="col" className="px-6 py-3">
                  Quantidade
                </th>
              </tr>
            </thead>
            <tbody>
              {cart.map((e, i) => {
                return (
                  <tr key={i} className="bg-white border-b ">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                    >
                      {e.name}
                    </th>
                    <td className="px-6 py-4">{e.price}</td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2 ">
                        <button
                          onClick={() =>
                            updateProductAmount({
                              productId: e.id!,
                              amount:
                                e.amount && e.amount !== 0 ? e.amount - 1 : 1,
                            })
                          }
                        >
                          <Minus size={14} className="text-blue-600" />
                        </button>
                        <span className="">{e.amount}</span>
                        <button
                          onClick={() =>
                            updateProductAmount({
                              productId: e.id!,
                              amount: e.amount ? e.amount + 1 : 1,
                            })
                          }
                        >
                          <Plus size={14} className="text-blue-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <span>Carrinho vazio</span>
        )}
      </div>
      <div className="m-auto border-2 mt-4 sm:rounded-lg w-2/3 p-4 flex justify-between text-xs text-gray-700 uppercase bg-gray-50">
        <h2 className="font-bold">Total</h2>
        <h2 className="font-bold">
          R${" "}
          {cart.length !== 0
            ? cart.map((e) => e.amount! * e.price).reduce((p, c) => p + c).toFixed(2)
            : 0}
        </h2>
      </div>
      <footer className="mt-10 flex justify-end w-2/3 m-auto">
        <button
          onClick={abandonCart}
          type="button"
          className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
        >
          Abandonar
        </button>
        <button
          onClick={() => nav("/payment")}
          type="button"
          className="m-0 text-white bg-blue-700 hover:bg-grey-200 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 "
        >
          Prosseguir para o checkout
        </button>
      </footer>
    </section>
  );
}
