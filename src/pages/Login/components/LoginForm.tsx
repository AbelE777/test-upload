import { Spinner } from "@material-tailwind/react";
import { useRecoilValue } from "recoil";
import arrowRight from "../../../assets/svg/arrow-right.svg";
import { FormErrorMessage } from "../../../components";
import { LoginFormValues } from "../../../types";
import CustomInput from "./CustomInputs";
import { useForm, SubmitHandler } from "react-hook-form";
import { isLoadingSelector } from "../../../recoil/selectors";


type Props = {
  onSubmit: SubmitHandler<LoginFormValues>;
};

const LoginForm = ({ onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>();
  // const error = errors[name];
  const isLoading = useRecoilValue(isLoadingSelector);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="relative mb-6">
        <CustomInput
          type="text"
          autofocus={true}
          errors={errors}
          register={register}
          name="username"
          label="Usuario *"
          rules={{ required: "Este campo es obligatorio" }}
        />
      </div>
      {errors["username"] && (
        <div className="-mt-5">
          <FormErrorMessage>
            {errors["username"]?.message?.toString()}
          </FormErrorMessage>
        </div>
      )}

      <div className="relative mb-6">
        <CustomInput
          autofocus={false}
          type="password"
          errors={errors}
          register={register}
          name="password"
          label="Contraseña *"
          rules={{ required: "Este campo es obligatorio" }}
        />
      </div>
      {errors["password"] && (
        <div className="-mt-5">
          <FormErrorMessage>
            {errors["password"]?.message?.toString()}
          </FormErrorMessage>
        </div>
      )}

      {/* <div className="mb-6 flex items-center justify-between">
        <label className="relative inline-flex items-center  cursor-pointer">
          <input type="checkbox" value="" className="sr-only peer" />
          <div className="w-11 h-6 bg-gray-400 rounded-full peer dark:bg-gray-400 peer-focus:ring-4 peer-focus:ring-white dark:peer-focus:ring-gray-900 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-sky-200 peer-checked:bg-blue-500"></div>
          <span className="ml-3  font-medium text-gray-500 dark:text-slate-200">
            Recordar
          </span>
        </label>

        <a
          href="#/"
          className="text-primary font-medium text-gray-500 dark:text-slate-200"
        >
          Olvidaste tu contraseña?
        </a>
      </div> */}

      <button className="outline-none w-1/2 relative inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium text-aky-600 transition duration-300 ease-out border-2 border-blue-300 rounded-full group">
        <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-100 -translate-x-full dark:bg-blue-500 bg-blue-500 group-hover:translate-x-0 ease">
          {isLoading ? <Spinner color="blue" /> : <img src={arrowRight} width={30} alt="Mi Icono" />}
        </span>
        <span className="dark:text-blue-300 text-blue-400 absolute flex items-center justify-center w-full h-full text-sky-500 transition-all duration-300 transform group-hover:translate-x-full ease">
          {isLoading ? <Spinner color="blue" /> : 'LOGIN'}
        </span>
        <span className="relative invisible">Ingresar</span>
      </button>
    </form>
  );
};

export default LoginForm;
