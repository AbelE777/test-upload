import { HiArrowPath, HiChevronLeft } from "react-icons/hi2";
import { SubmitHandler, useForm } from "react-hook-form";
import { IClientData, IEditClientFormFields } from "../../types";
import classNames from "classnames";
import CustomInput from "../Login/components/CustomInputs";
import { FormErrorMessage } from "../../components";
import { Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";

type Props = {
  onSubmit: SubmitHandler<IEditClientFormFields>;
  cliente: IClientData;
};
const EditClientForm = ({ onSubmit, cliente }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    formState
  } = useForm<IEditClientFormFields>({
    defaultValues: {
      direccion: cliente.fk_usuario.fk_persona.direccion,
      email: cliente.fk_usuario.fk_persona.email,
      telefono: cliente.fk_usuario.fk_persona.telefono,
    },
  });
  const clsinput = ["flex", "flex-col", "sm:flex-row", "gap-2", "mb-4"];

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* DIRECCION Y CORREO */}
      <div className={classNames(clsinput)}>
        <div className="relative w-full sm:w-1/2">
          <CustomInput
            autofocus={true}
            capitalize={true}
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
            <FormErrorMessage>
              {errors["direccion"]?.message?.toString()}
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
            name="email"
            label="Correo *"
            rules={{
              required: "Este campo es obligatorio",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Dirección de email inválida",
              },
            }}
          />
          {errors["email"] && (
            <FormErrorMessage>
              {errors["email"]?.message?.toString()}
            </FormErrorMessage>
          )}
        </div>
      </div>

      <div className="relative w-full sm:w-1/2">
        <CustomInput
          autofocus={false}
          capitalize={true}
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
            pattern: {
              value: /^\d+$/i,
              message: "Teléfono inválido",
            },
          }}
        />
        {errors["telefono"] && (
          <FormErrorMessage>
            {errors["telefono"]?.message?.toString()}
          </FormErrorMessage>
        )}
      </div>

      <div className="mt-7">
        <div className="w-full mb-5 flex md:w-2/5 justify-center mx-auto">
          <Link to="/clients">
            <Button
              type="submit"
              disabled={Object.keys(errors).length > 0}
              variant="outlined"
              className="rounded-full flex items-center justify-center mx-auto gap-3"
            >
              <HiChevronLeft size={20} />
              Regresar
            </Button>
          </Link>
          <Button
            type="submit"
            disabled={Object.keys(errors).length > 0 || !formState.isDirty}
            variant="gradient"
            color="blue"
            className="rounded-full flex items-center justify-center mx-auto gap-3"
          >
            ACTUALIZAR CLIENTE
            <HiArrowPath size={20} />
          </Button>
        </div>
      </div>
    </form>
  );
};

export default EditClientForm;
