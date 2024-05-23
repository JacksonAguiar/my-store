import { useCallback, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import ProductService from "services/ProductsService";

const service = new ProductService();

export default function NewProductPage() {
  const nav = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();
  const { id } = useParams();

  const fetchProductToUpdate =  useCallback(async() => {
    const p = await service.getProductById(id);
    setValue(
      "name", p.name
    );
    setValue(
      "description", p.description
    );
    setValue(
      "price", p.price
    );
    setValue(
      "stock", p.stock
    );
  }, [id, service, setValue]);

  const onSubmit: SubmitHandler<any> = async (data) => {
    var image = data.image[0];
    var imageUpdated = image != null;

    if (imageUpdated) {
      data.imageUpdated = true;
    }else{
      delete data.image;
    }

    if (id) {
      await service.updateProduct(id, data, image);
    } else {
      await service.createProduct(data, image);
    }

    nav("/admin/products");
  };

  useEffect(() => {
    if (id) {
      fetchProductToUpdate();
    }
  }, [id, fetchProductToUpdate]);

  return (
    <section className="w-2/3 m-auto p-10">
      <h1 className="font-bold text-xl mb-6">Cadastro de produto</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-5">
          <label
            htmlFor="product"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Imagem do produto
          </label>
          <input
            type="file"
            id="product"
            placeholder=""
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            {...register("image")}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="product"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Nome do produto
          </label>
          <input
            type="text"
            id="product"
            placeholder=""
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            required
            {...register("name")}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="product"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Descrição do produto
          </label>
          <textarea
            id="message"
            rows={4}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Descrição"
            {...register("description")}
          ></textarea>
        </div>
        <div className="flex">
          <div className="mb-5">
            <label
              htmlFor="product"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Valor do produto
            </label>
            <input
              type="number"
              id="product"
              step=".01"
              placeholder=""
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              required
              {...register("price")}
            />
          </div>
          <div className="mb-5 ml-4">
            <label
              htmlFor="product"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Quantidade em estoque
            </label>
            <input
              type="number"
              id="product"
              placeholder=""
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              required
              {...register("stock")}
            />
          </div>
        </div>
        <div className="mt-10 flex justify-center  m-auto">
          <button
            type="button"
            onClick={() => nav("/admin/products")}
            className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
          >
            Sair
          </button>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-grey-200 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 "
          >
            Salvar
          </button>
        </div>
      </form>
    </section>
  );
}
