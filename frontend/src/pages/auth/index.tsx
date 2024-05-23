import { useAuth } from "hooks/useAuth";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function AuthenticationPage() {
  const nav = useNavigate();
  const { signIn } = useAuth();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit: SubmitHandler<any> = async (data) => {
    const { email, password } = data;

    await signIn({ email, password });
    nav("/");
  };
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-2/6 h-96 bg-white rounded-lg border-2 border-slate-200 p-8 flex flex-col justify-center">
        <h2 className="font-bold text-3xl">Conecte-se</h2>
        <form className=" mt-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Seu e-mail
            </label>
            <input
              type="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="name@email.com"
              {...register("email")}
              required
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Sua senha
            </label>
            <input
              type="password"
              id="password"
              placeholder="********"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              {...register("password")}
              required
            />
          </div>
          <button
            type="submit"
            className="text-white w-full m-auto bg-blue-700 hover:bg-grey-200 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 "
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
