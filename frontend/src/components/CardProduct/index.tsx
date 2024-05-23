import { ImageOff } from "lucide-react";
import { IProduct } from "types/interfaces";

const CardProductComponent = ({
  onClick,
  product,
}: {
  onClick: () => void;
  product: IProduct;
}) => {
  let image = `${process.env.REACT_APP_BACKEND_URL!}/${product.image}`;
  return (
    <div className="flex flex-col justify-between w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow transition-all hover:scale-105 ">
      {product.image ? (
        <img
          crossOrigin="anonymous"
          className="p-8 rounded-t-lg m-auto"
          src={image}
          height={150}
          width={150}
          alt="product"
        />
      ) : (
        <div className="p-8 rounded-t-lg m-auto text-gray-200">
          <ImageOff size={100} />
        </div>
      )}

      <div className="px-5 pb-5">
        <h5 className="text-xl font-semibold tracking-tight text-gray-900">
          {product.name}
        </h5>
        <div className="flex items-center mt-2.5 mb-5">
          <span className="text-gray-400">{product.description}</span>
        </div>
        <div className="flex items-center justify-between ">
          <span className="text-3xl font-bold text-gray-900 ">
            ${product.price.toString()}
          </span>
          <button
            onClick={onClick}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
          >
            Adicionar ao carrinho
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardProductComponent;