import { HiCamera, HiArrowPath, HiChevronLeft } from "react-icons/hi2";
import { PiHandTap } from "react-icons/pi";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue } from "recoil";
import { currentUserSelector } from "../../recoil/selectors";
import { IEditProfileFormFields } from "../../types";
import { FormErrorMessage, ModalImage } from "..";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import CustomInput from "../../pages/Login/components/CustomInputs";
import classNames from "classnames";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { isLoadingState, userState } from "../../recoil/atoms";
import { updateProfileData, updateProfilePic } from "../../api";
import { useLogout } from "../../hooks";

const EditProfile = () => {
  const { user } = useRecoilValue(currentUserSelector);
  const [newImage, setNewImage] = useState("");
  const [open, setOpen] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [, setIsLoading] = useRecoilState(isLoadingState);
  const [, setUser] = useRecoilState(userState);
  const logout = useLogout();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    formState,
  } = useForm<IEditProfileFormFields>({
    defaultValues: {
      direccion: user.fk_persona.direccion,
      email: user.fk_persona.email,
      telefono: user.fk_persona.telefono,
    },
  });
  const cluod_name = import.meta.env.VITE_CLOUD_NAME;
  const upload_preset = import.meta.env.VITE_CLOUD_UPLOAD_PRESET;

  const onSubmit: SubmitHandler<IEditProfileFormFields> = async (data) => {
    const personid = user.fk_persona.id_persona;
    setIsLoading(true);
    updateProfileData(personid, data)
      .then((response) => {
        const personData = response.data;
        const user = JSON.parse(localStorage.getItem("user_data")!) || null;
        user.fk_persona = personData;
        const access_token = localStorage.getItem("access_token")! || null;
        setUser({ user, access_token });
        toast.success("Actualización exitosa!");
        navigate("/profile");
      })
      .catch((error) => {
        console.error(error);
        toast.error("Error al actualizar datos");
      })
      .finally(() => setIsLoading(false));
  };
  useEffect(() => {
    setImageLoaded(false);
  }, [newImage]);

  const clsinput = ["flex", "flex-col", "sm:flex-row", "gap-2", "mb-4"];

  const hadleOpenImageModal = () => setOpen(true);

  const handleUpdateProfileImage = () => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("file", newImage);
    formData.append("upload_preset", upload_preset);
    formData.append("cloud_name", cluod_name);
    axios
      .post(
        `https://api.cloudinary.com/v1_1/${cluod_name}/image/upload`,
        formData
      )
      .then((response) => {
        const img = response.data.secure_url;
        const userid = user.id_usuario;

        updateProfilePic(userid, img)
          .then((response) => {
            const newImgUrl = response.data.profile_img;
            const user = JSON.parse(localStorage.getItem("user_data")!) || null;
            const access_token = localStorage.getItem("access_token")! || null;
            user.profile_img = newImgUrl;
            setUser({ user, access_token });
            toast.success("Actualización exitosa!");
            navigate("/profile");
          })
          .catch((error) => {
            console.error("Error al actualizar imagen:", error);
            toast.error("Error al actualizar imagen");
            if (error.response.status === 401) {
              logout();
            }
          });
        setImageLoaded(false);
      })
      .catch((error: AxiosError) => {
        console.log(error);
        if (error.response?.status === 401)
          toast.error(
            "Error de autenticación, contactese con el Administrador"
          );
        else toast.error("Error al actualizar imagen");
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="h-full mx-auto md:mx-auto md:w-4/5">
      {open && (
        <ModalImage
          open={open}
          setOpen={setOpen}
          imgUrl={newImage ? newImage : user.profile_img}
          setNewImage={setNewImage}
        />
      )}
      <div className="block md:flex rounded-xl">
        <div className="w-full md:w-2/5 p-4 sm:p-6 lg:p-8 bg-white dark:bg-gray-900 shadow-md rounded-xl">
          <div className="w-full md:w-fit mx-auto relative group">
            <div
              onClick={hadleOpenImageModal}
              className="cursor-pointer mx-auto max-w-xs w-40  transition-transform duration-300 transform-gpu hover:scale-105"
            >
              {newImage ? (
                <motion.div
                  id="showImage"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{
                    opacity: imageLoaded ? 1 : 0,
                    y: imageLoaded ? 0 : 40,
                  }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  className="border-2 border-gray-300 rounded-full"
                  onAnimationComplete={() => {
                    setImageLoaded(true);
                  }}
                >
                  <img
                    id="showImage"
                    className="w-44 h-40 md:w-44 md:h-40 rounded-full opacity-100 duration-300 transition-opacity group-hover:opacity-30"
                    src={imageLoaded ? newImage : ""}
                    alt=""
                    style={{ position: "relative" }}
                  />
                </motion.div>
              ) : (
                <img
                  id="showImage"
                  className="w-44 h-40 md:w-44 md:h-40 rounded-full opacity-100 duration-300 transition-opacity group-hover:opacity-30 border-2 border-gray-300"
                  src={user.profile_img}
                  alt=""
                  style={{ position: "relative" }}
                />
              )}
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
          <div className="text-center flex md:hidden mt-3 justify-center">
            <Button
              onClick={hadleOpenImageModal}
              size="sm"
              className="rounded-full flex items-center gap-3 border-none dark:text-gray-300 dark:font-medium"
              variant="outlined"
            >
              <PiHandTap size={20} className="text-blue-900" />
              Toca para editar
            </Button>
          </div>
          {imageLoaded && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: imageLoaded ? 1 : 0,
                y: imageLoaded ? 0 : 20,
              }}
              transition={{ duration: 0.3, delay: 0.4 }}
              className="text-center flex justify-center mt-3"
            >
              <Button
                onClick={handleUpdateProfileImage}
                size="sm"
                className="flex rounded-full items-center gap-3 border-none dark:text-gray-300 dark:font-medium"
                variant="gradient"
                color="blue"
              >
                ACTUALIZAR
                <HiArrowPath size={20} />
              </Button>
            </motion.div>
          )}
        </div>

        <div className="w-full md:w-3/5 p-8 bg-white  dark:bg-gray-900 lg:ml-4 shadow-md rounded-xl">
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* <input
              {...register("profileImg")}
              type="file"
              accept=".jpg, .jpeg, .png"
              id="profileImgInput"
              className="hidden"
              onChange={handleFileInputChange}
            /> */}
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

            <div className="mx-auto w-full mb-5 mt-7 flex md:w-3/5 gap-4 justify-center">
              <Link to="/profile">
                <Button
                  type="submit"
                  variant="outlined"
                  className="rounded-full flex items-center dark:bg-blue-gray-100"
                >
                  <HiChevronLeft size={20} />
                  Regresar
                </Button>
              </Link>
              <Button
                type="submit"
                variant="gradient"
                color="blue"
                className="rounded-full flex items-center gap-3 font-normal"
                disabled={!formState.isDirty || !formState.isValid}
              >
                ACTUALIZAR
                <HiArrowPath size={20} />
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
