import { SubmitHandler, useForm } from "react-hook-form";
import { INewClientFormFields } from "../../../types";
import CustomInput from "../../Login/components/CustomInputs";
import {  FormErrorMessage, SelectInput } from "../../../components";
import classNames from "classnames";
import { FiUserCheck } from "react-icons/fi";

import DatePicker from "../../../components/DatePicker/DatePicker";
import GeneratedPassword from "./GeneratedPassword";
import zonas from "../../../data/zonasCliente.json"

type Props = {
  onSubmit: SubmitHandler<INewClientFormFields>;
};

const NewClientForm = ({ onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    trigger,
    formState: { errors },
  } = useForm<INewClientFormFields>();
  const clsinput = ["flex", "flex-col", "sm:flex-row", "gap-2", "mb-4"];
  const cedula = watch("cedula");
  // const pass = watch("password");

  const handleGeneratePassword = () => {
    setValue("password", "jar-"+cedula);
    trigger("password");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* NOMBRES Y APELLIDOS */}
      <div className={classNames(clsinput)}>
        <div className="relative w-full sm:w-1/2">
          <CustomInput
            autofocus={false}
            capitalize={true}
            type="text"
            errors={errors}
            register={register}
            name="nombres"
            label="Nombres *"
            rules={{ required: "Este campo es obligatorio" }}
          />
          {errors["nombres"] && (
            <FormErrorMessage>
              {errors["nombres"]?.message?.toString()}
            </FormErrorMessage>
          )}
        </div>
        <div className="relative w-full sm:w-1/2">
          <CustomInput
            autofocus={false}
            capitalize={true}
            type="text"
            errors={errors}
            register={register}
            name="apellidos"
            label="Apellidos *"
            rules={{ required: "Este campo es obligatorio" }}
          />
          {errors["apellidos"] && (
            <FormErrorMessage>
              {errors["apellidos"]?.message?.toString()}
            </FormErrorMessage>
          )}
        </div>
      </div>

      {/* CEDULA Y TELEFONO */}
      <div className={classNames(clsinput)}>
        <div className="relative w-full sm:w-1/2">
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
              maxLength: {
                value:10,
                message: "Cédula debe contener máximo 10 caracteres",
              },
              required: "Este campo es obligatorio",
              validate: () => {
                // if (!validadorCedula(value)) {
                //   return "Número de cédula inválido";
                // }
              },
            }}
          />
          {errors["cedula"] && (
            <FormErrorMessage>
              {errors["cedula"]?.message?.toString()}
            </FormErrorMessage>
          )}
        </div>
        <div className="relative w-full sm:w-1/2">
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
          {errors["telefono"] && (
            <FormErrorMessage>
              {errors["telefono"]?.message?.toString()}
            </FormErrorMessage>
          )}
        </div>
      </div>

      {/* DIRECCION Y CORREO */}
      <div className={classNames(clsinput)}>
        <div className="relative w-full sm:w-1/2">
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
          {errors["direccion"] && (
            <div className="">
              <FormErrorMessage>
                {errors["direccion"]?.message?.toString()}
              </FormErrorMessage>
            </div>
          )}
        </div>
        <div className="relative w-full sm:w-1/2">
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
          {errors["email"] && (
            <div className="">
              <FormErrorMessage>
                {errors["email"]?.message?.toString()}
              </FormErrorMessage>
            </div>
          )}
        </div>
      </div>

      {/* GENERO Y PROFESION */}
      <div className={classNames(clsinput)}>
        <div className="relative w-full sm:w-1/2">
          <SelectInput
            name="genero"
            label="Género"
            options={["Masculino", "Femenino", "Otro"]}
            errors={errors}
            control={control}
            register={register}
          />
        </div>

        <div className="relative w-full sm:w-1/2">
          <SelectInput
            name="profesion"
            label="Profesión"
            options={["Odontólogo", "Médico", "Obstetra", "Pediatra"]}
            errors={errors}
            control={control}
            register={register}
          />
        </div>
      </div>

      {/* USUARIO Y CONTRASENA */}
      <div className={classNames(clsinput)}>
        <div className="relative w-full sm:w-1/2">
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
          {errors["username"] && (
            <div className="">
              <FormErrorMessage>
                {errors["username"]?.message?.toString()}
              </FormErrorMessage>
            </div>
          )}
        </div>

        <div className="relative w-full sm:w-1/2">
          <GeneratedPassword
            autofocus={false}
            type="text"
            errors={errors}
            register={register}
            name="password"
            label="Contraseña *"
            rules={{ required: "Este campo es obligatorio" }}
            tooltipText="Generar contraseña"
            control={control}
            handleGeneratePassword={handleGeneratePassword}
          />
          {errors["password"] && (
            <div className="">
              <FormErrorMessage>
                {errors["password"]?.message?.toString()}
              </FormErrorMessage>
            </div>
          )}
        </div>
      </div>

      {/* PRECIO Y FECHA NACIMIENTO */}
      <div className={classNames(clsinput)}>
        <div className="relative w-full sm:w-1/2">
          <DatePicker
            name="fecha_nacimiento"
            label="Fecha Nacimiento"
            control={control}
          />
        </div>
        <div className="relative w-full sm:w-1/2">
          <SelectInput
            name="precio"
            label="Precio"
            options={["$13", "$15", "$16"]}
            errors={errors}
            control={control}
            register={register}
          />
        </div>
      </div>
      
      {/* ZONA */}
      <div className={classNames(clsinput)}>
        <div className="relative w-full sm:w-1/2">
          <SelectInput
            name="zona"
            label="Zona"
            options={zonas}
            errors={errors}
            control={control}
            register={register}
          />
        </div>
      </div>

      <div className="mt-7">
        <div className="w-full mb-5">
          <button disabled={Object.keys(errors).length > 0} className="disabled:opacity-50 gap-x-3 rounded-full flex items-center justify-center w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700  text-white py-3 font-semibold">
            CREAR CLIENTE
            <FiUserCheck size={20} />
          </button>
        </div>
      </div>
    </form>
  );
};

export default NewClientForm;
