import { File } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import QRCode from "react-qr-code";
import SalesService from "services/SalesService";

const service = new SalesService();
export default function PixBillPage() {
  const [source, setSource] = useState<{
    type: string;
    url: string;
    status: string;
  }>();
  const { id } = useParams();
  const nav = useNavigate();

  const onSubmit = async () => {
    await service.processPayment(id);
    nav("/success");
  };

  const getSource = useCallback(async () => {
    const response = await service.getPaymentSource(id);

    setSource(response);
    console.log(response);
  }, [id, setSource]);

  useEffect(() => {
    if (id) {
      getSource();
    }
  }, [id, getSource]);

  if (source)
    return (
      <section className="p-10 flex flex-col m-auto h-screen w-2/3">
        <header className="">
          <h1 className="font-bold text-xl">Realize o pagamento</h1>
        </header>

        <div className="m-auto flex flex-col items-center justify-center text-center">
          {source.type === "pix" ? (
            <QrCodePixComponent url={source.url} />
          ) : (
            <BoletoComponent link={source.url} />
          )}
          <button
            onClick={onSubmit}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-4"
          >
            Pagamento realizado
          </button>
        </div>
      </section>
    );
  else return <h1>Loading</h1>;
}

const BoletoComponent = ({ link }: { link: string }) => {
  return (
    <div>
      <File size={200} />
      <Link
        to={link}
        target="_blank"
        download
        className="mt-4 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
      >
        Baixar boleto
      </Link>
    </div>
  );
};
const QrCodePixComponent = ({ url }: { url: string }) => {
  return (
    <div>
      <QRCode value={url} />
    </div>
  );
};
