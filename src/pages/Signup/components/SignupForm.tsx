import { SubmitHandler, useForm } from "react-hook-form";
import { RegistrationFormValues } from "../../../types";
import CustomInput from "../../Login/components/CustomInputs";
import { Checkbox, FormErrorMessage } from "../../../components";
import classNames from "classnames";
import { FiUserCheck } from "react-icons/fi";
import { Link } from "react-router-dom";

type Props = {
  onSubmit: SubmitHandler<RegistrationFormValues>;
};

const SignupForm = ({ onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegistrationFormValues>();
  const clsinput = ["relative", "w-1/2", "ml-2", "mb-3"];

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* NOMBRES Y APELLIDOS */}
      <div className="flex">
        <div className={classNames(clsinput)}>
          <CustomInput
            autofocus={true}
            type="text"
            errors={errors}
            register={register}
            name="nombres"
            label="Nombres *"
            rules={{ required: "Este campo es obligatorio" }}
          />
        </div>

        <div className={classNames(clsinput)}>
          <CustomInput
            autofocus={false}
            type="text"
            errors={errors}
            register={register}
            name="apellidos"
            label="Apellidos *"
            rules={{ required: "Este campo es obligatorio" }}
          />
        </div>
      </div>
      {(errors["nombres"] || errors["apellidos"]) && (
        <div className="flex">
          <div className="w-1/2 ml-2  -mt-3">
            {errors && (
              <FormErrorMessage>
                {errors["nombres"]?.message?.toString()}
              </FormErrorMessage>
            )}
          </div>
          <div className="w-1/2 ml-2  -mt-3">
            {errors && (
              <FormErrorMessage>
                {errors["apellidos"]?.message?.toString()}
              </FormErrorMessage>
            )}
          </div>
        </div>
      )}  

      {/* CEDULA Y TELEFONO */}
      <div className="flex">
        <div className={classNames(clsinput)}>
          <CustomInput
            autofocus={false}
            type="text"
            errors={errors}
            register={register}
            name="cedula"
            label="Cédula *"
            rules={{
              minLength: {
                value: 10,
                message: "Cédula debe contener al menos 10 caracteres",
              },
              required: "Este campo es obligatorio",
            }}
          />
        </div>
        <div className={classNames(clsinput)}>
          <CustomInput
            autofocus={false}
            type="text"
            errors={errors}
            register={register}
            name="telefono"
            label="Teléfono *"
            rules={{
              minLength: {
                value: 10,
                message: "Teléfono debe contener al menos 10 caracteres",
              },
              required: "Este campo es obligatorio",
            }}
          />
        </div>
      </div>
      {(errors["cedula"] || errors["telefono"]) && (
        <div className="flex">
          <div className="w-1/2 ml-2  -mt-3">
            {errors && (
              <FormErrorMessage>
                {errors["cedula"]?.message?.toString()}
              </FormErrorMessage>
            )}
          </div>
          <div className="w-1/2 ml-2  -mt-3">
            {errors && (
              <FormErrorMessage>
                {errors["telefono"]?.message?.toString()}
              </FormErrorMessage>
            )}
          </div>
        </div>
      )}  
      
      {/* DIRECCION */}
      <div className="flex">
        <div className="relative w-full ml-2 mb-3">
          <CustomInput
            autofocus={false}
            type="text"
            errors={errors}
            register={register}
            name="direccion"
            label="Dirección *"
            rules={{
              minLength: {
                value: 10,
                message: "Dirección debe contener al menos 10 caracteres",
              },
              required: "Este campo es obligatorio",
            }}
          />
        </div>
      </div>
      {errors["direccion"] && (
        <div className="-mt-3">
          <FormErrorMessage>
            {errors["direccion"]?.message?.toString()}
          </FormErrorMessage>
        </div>
      )}
      
      {/* CORREO */}
      <div className="flex">
        <div className="relative w-full ml-2 mb-3">
          <CustomInput
            autofocus={false}
            type="text"
            errors={errors}
            register={register}
            name="email"
            label="Correo *"
            rules={{
              required: "Este campo es obligatorio",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "invalid email address",
              },
            }}
          />
        </div>
      </div>
      {errors["email"] && (
        <div className="-mt-3">
          <FormErrorMessage>
            {errors["email"]?.message?.toString()}
          </FormErrorMessage>
        </div>
      )}
      <div className="flex">
        <div className="relative w-full ml-2 mb-3">
          <CustomInput
            autofocus={false}
            type="text"
            errors={errors}
            register={register}
            name="username"
            label="Usuario *"
            rules={{
              minLength: {
                value: 5,
                message: "Usuario debe contener al menos 5 caracteres",
              },
              required: "Este campo es obligatorio",
            }}
          />
        </div>
      </div>
      {errors["username"] && (
        <div className="-mt-3">
          <FormErrorMessage>
            {errors["username"]?.message?.toString()}
          </FormErrorMessage>
        </div>
      )}
      {/* CONTRASENA */}
      <div className="flex">
        <div className="relative w-full ml-2 mb-3">
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
      </div>
      {errors["password"] && (
        <div className="-mt-3">
          <FormErrorMessage>
            {errors["password"]?.message?.toString()}
          </FormErrorMessage>
        </div>
      )}
      {/* CONFIRMAR CONTRASENA */}
      <div className="flex">
        <div className="relative w-full ml-2 mb-3">
          <CustomInput
            autofocus={false}
            type="password"
            errors={errors}
            register={register}
            name="confirmPassword"
            label="Confirma Contraseña *"
            rules={{
              pattern: {
                value:
                  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*\W)[A-Za-z\d\W]{7,}$/i,
                message: `Contraseña debe contener al menos 7 caracteres, y 1 número o 1 caracter especial`,
              },
              required: "Este campo es obligatorio",
              validate: (val: string) => {
                if (watch("password") != val) {
                  return "Las contraseñas deben conincidir";
                }
              },
            }}
          />
        </div>
      </div>
      {errors["confirmPassword"] && (
        <div className="-mt-3">
          <FormErrorMessage>
            {errors["confirmPassword"]?.message?.toString()}
          </FormErrorMessage>
        </div>
      )}
      <div className="flex items-center ml-4">
        <Checkbox
          register={register}
          rules={{
            required: "Por favor, acepta nuestros términos y condiciones.",
          }}
          name="tyc"
          label="He leído y acepto los términos y condiciones."
        />
      </div>
      {errors["tyc"] && (
        <div className="mt-2">
          <FormErrorMessage>
            {errors["tyc"]?.message?.toString()}
          </FormErrorMessage>
        </div>
      )}
      <div className="mt-7">
        <div className="w-full mb-5">
          <button className="gap-x-3 rounded-full flex items-center justify-center w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700  text-white py-3 font-semibold">
            CREAR CUENTA
            <FiUserCheck size={20} />
          </button>
        </div>
        <div className="flex items-center justify-items-start pb-6">
          <p className="mb-0 mr-2 text-gray-600 dark:text-slate-100">
            Ya tienes una cuenta?
          </p>
          <Link
            to="/login"
            type="button"
            // className="inline-block rounded-lg border-2 border-danger px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-danger-600 focus:border-danger-600 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700"
            className="inline-block rounded-lg px-1 pb-[6px] pt-2 text-xs font-bold dark:text-slate-100 text-slate-500 uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-danger-600 focus:border-danger-600 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700"
          >
            Inicia sesión
          </Link>
        </div>
      </div>
    </form>
  );
};

export default SignupForm;
