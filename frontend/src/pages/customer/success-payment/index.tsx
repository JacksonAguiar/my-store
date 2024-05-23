import { ArrowLeft, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SuccessOrderPage() {
  const nav = useNavigate();

  return (
    <section className="p-10 flex flex-col m-auto h-screen w-2/3">
      <header className="">
        <button
          onClick={() => nav("/")}
          className="flex hover:opacity-55 transition-opacity space-x-2 items-center"
        >
          <ArrowLeft size={16} />
          <span>Voltar para a home</span>
        </button>
      </header>
      <div className=" m-auto flex items-center">
        <h1 className="font-bold text-xl">Pagamento concluido</h1>
        <Check size={100} />
      </div>
    </section>
  );
}
