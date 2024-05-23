import { useAuth } from "hooks/useAuth";
import { useCart } from "hooks/useCart";
import { useState } from "react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import { generatePath, useNavigate } from "react-router-dom";
import SalesService from "services/SalesService";
import { IProduct, ISaleProduct } from "types/interfaces";

export default function PaymentPage() {
  const { cart, clearCart } = useCart();
  const {user} =useAuth();
  const nav = useNavigate();
  const [option, setOption] = useState<any>();
  var total = cart.map((e) => e.amount! * e.price).reduce((p, c) => p + c);

  const options = [
    { label: "Cartão de crédito", value: "credit_card" },
    { label: "Pix", value: "pix" },
    { label: "Boleto", value: "bill" },
  ];

  const onSubmit = async () => {

    if(!option) return;

    const service = new SalesService();

    const items: ISaleProduct[] = cart.map((e: IProduct) => {
      return {
        productId: e.id!,
        quantity: e.amount!,
        price: e.price,
      };
    });
    const {id}: any = user;
    const resp = await service.createSale(option.value, items, total, id);

    clearCart();
    
    if (option.value === "credit_card") {
      nav("/success");
    } else {
      const sid = resp.id;
      nav(generatePath("/finish-payment/:id", { id:sid }));
    }
  };

  return (
    <section className="p-10 flex flex-col m-auto h-screen w-2/3">
      <header className="">
        {/* <button className="flex hover:opacity-55 transition-opacity space-x-2 items-center">
          <ArrowLeft size={16} />
          <span>Voltar</span>
        </button> */}
        <h1 className="font-bold text-xl">Meio de pagamento</h1>
      </header>
      <div className=" m-auto flex items-center">
        <label htmlFor="" className="mr-2">
          Escolha uma forma de pagamento
        </label>
        <Dropdown
          options={options}
          onChange={setOption}
          placeholder="Selecione"
        />
      </div>
      <footer className="mt-10 flex flex-col items-end w-2/3 m-auto">
        <h1 className="font-bold mb-2 text-xl">Total: R$ {total}</h1>
        <div className="flex">
          <button
            type="button"
            className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
          >
            Abandonar
          </button>
          <button
            type="button"
            onClick={onSubmit}
            className="m-0 text-white bg-blue-700 hover:bg-grey-200 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 "
          >
            Pagar
          </button>
        </div>
      </footer>
    </section>
  );
}
