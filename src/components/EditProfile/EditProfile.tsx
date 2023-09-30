import { HiCamera, HiArrowPath, HiChevronLeft } from "react-icons/hi2";
import { PiHandTap } from "react-icons/pi";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import { currentUserSelector } from "../../recoil/selectors";
import { IEditProfileFormFields } from "../../types";
import { FormErrorMessage, ModalImage } from "..";
import { Link } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import CustomInput from "../../pages/Login/components/CustomInputs";
import classNames from "classnames";
import { useEffect, useState } from "react";

const EditProfile = () => {
  const [fileTouched, setFileTouched] = useState(false);
  const { user } = useRecoilValue(currentUserSelector);
  const [newImage, setNewImage] = useState();
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    formState,
    control,
    setValue,
  } = useForm<IEditProfileFormFields>({
    defaultValues: {
      direccion: user.fk_persona.direccion,
      email: user.fk_persona.email,
      telefono: user.fk_persona.telefono,
    },
  });
  useEffect(() => {
    if(!open) setFileTouched(false)
  }, [open])
  
  
  const onSubmit: SubmitHandler<IEditProfileFormFields> = async (data) => {
    console.log(data);
  };
  
  const clsinput = ["flex", "flex-col", "sm:flex-row", "gap-2", "mb-4"];

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      console.log(file);
      reader.onload = (e) => {
        // Cuando se cargue la imagen, actualiza el estado
        setNewImage(e.target.result);
        setFileTouched(true);
      };
      // Lee el contenido del archivo como una URL de datos
      reader.readAsDataURL(file);
    }
  };
  const handleChooseImg = () => document?.getElementById("profileImgInput")?.click();
  const hadleOpenImageModal = () => setOpen(true);
  
  return (
    <div className="h-full mx-auto md:mx-auto md:w-4/5">
      {open && (
        <ModalImage
          open={open}
          setOpen={setOpen}
          imgUrl={newImage ? newImage : user.profile_img}
          handleChooseImg={handleChooseImg}
          fileTouched={fileTouched}
        />
      )}
      <div className="block md:flex rounded-xl">
        <div className="w-full md:w-2/5 p-4 sm:p-6 lg:p-8 bg-white dark:bg-gray-900 shadow-md rounded-xl">
          <div className="w-full md:w-fit mx-auto relative group">
            <div
              onClick={hadleOpenImageModal}
              className="cursor-pointer mx-auto max-w-xs w-40  transition-transform duration-300 transform-gpu hover:scale-105"
            >
              <img
                id="showImage"
                className="w-44 h-40 md:w-44 md:h-40 rounded-full opacity-100 duration-300 transition-opacity group-hover:opacity-30 border-2 border-gray-300"
                src={newImage ? newImage : user.profile_img}
                alt=""
                style={{ position: "relative" }}
              />
              <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <HiCamera className="text-blue-500 text-4xl" size={50} />
              </div>
            </div>
            <div
              className="hidden md:block absolute top-2 right-4 border-2 border-gray-500 bg-gray-100 rounded-full p-1 cursor-pointer"
              onClick={hadleOpenImageModal}
            >
              <HiCamera size={20} className="text-blue-900" />
            </div>
          </div>
          <div className="text-center flex md:hidden justify-center">
            <Button
              onClick={hadleOpenImageModal}
              size="sm"
              className="flex items-center gap-3 border-none dark:text-gray-300 dark:font-medium"
              variant="outlined"
            >
              <PiHandTap size={28} className="text-blue-900" />
              Toca para editar
            </Button>
          </div>
        </div>

        <div className="w-full md:w-3/5 p-8 bg-white  dark:bg-gray-900 lg:ml-4 shadow-md rounded-xl">
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              {...register("profileImg")}
              type="file"
              accept=".jpg, .jpeg, .png"
              id="profileImgInput"
              className="hidden"
              onChange={handleFileInputChange}
            />
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
              <div className="w-full mb-5 flex md:w-3/5 justify-center mx-auto">
                <Link to="/clients">
                  <Button
                    type="submit"
                    variant="outlined"
                    className="rounded-full flex items-center justify-center mx-auto gap-3"
                  >
                    <HiChevronLeft size={20} />
                    Regresar
                  </Button>
                </Link>
                <Button
                  type="submit"
                  variant="gradient"
                  color="blue"
                  className="rounded-full flex items-center justify-center mx-auto gap-3"
                >
                  ACTUALIZAR
                  <HiArrowPath size={20} />
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <pre>{JSON.stringify(formState.isValid)}</pre>
      {errors["direccion"] && (
        <FormErrorMessage>
          {errors["direccion"]?.message?.toString()}
        </FormErrorMessage>
      )}
      {errors["email"] && (
        <FormErrorMessage>
          {errors["email"]?.message?.toString()}
        </FormErrorMessage>
      )}
      {errors["password"] && (
        <FormErrorMessage>
          {errors["password"]?.message?.toString()}
        </FormErrorMessage>
      )}
      {errors["profileImg"] && (
        <FormErrorMessage>
          {errors["profileImg"]?.message?.toString()}
        </FormErrorMessage>
      )}
      {Object.keys(errors).map((fieldName) => (
        <span key={fieldName}> {fieldName},</span>
      ))}
      {!formState.isValid && (
        <p>
          El formulario no es válido. Los campos con errores son:
          {Object.keys(errors).map((fieldName) => (
            <span key={fieldName}> {fieldName},</span>
          ))}
        </p>
      )}
    </div>
  );
};

export default EditProfile;
