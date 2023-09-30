import { SubmitHandler } from "react-hook-form";
import { IUserRegistrationFormValues } from "../../types";
// import { getFromPath } from "../../utils/getFromPath";
// import { useLocation, useNavigate } from "react-router-dom";
import NewUserForm from "./components/NewUserForm";
import { motion } from "framer-motion";
import { Title } from "../../components";
import { createCommonUser } from "../../api";
import { toast } from 'sonner';

const NewUser = () => {
  // const navigate = useNavigate();
  // const location = useLocation();

  const onSubmit: SubmitHandler<IUserRegistrationFormValues> = (data) => {
    console.log(data);
    // setAuth({ user: data });
    // const from = getFromPath(location);
    // navigate(from, { replace: true });
    data.rol = Number(data.rol)
    console.log(data.rol)
    createCommonUser(data)
      .then((response) => {   
        console.log(response)     
        if(response.status === 201)toast.success("Usuario Añadido con éxito!")
      })
      .catch((error) => {
        // La Promesa fue rechazada debido a un error
        // Puedes manejar el error aquí
        console.error("Error al llamar a createUserCliente:", error);
        if(Array.isArray(error.response.data.message)) toast.error(error.response.data.message[0])
        else toast.error(error.response.data.message)
      });
  };

  return (
    <div className="">
      <Title size="large" color="gray-800" position="left">
        Nuevo Usuario
      </Title>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        className="flex items-center justify-center pb-5"
      >
        <div
          className="dark:bg-gray-900 bg-white-100 text-gray-500 rounded-3xl w-full overflow-hidden"
          style={{ maxWidth: "1000px" }}
        >
          <div className="md:flex w-full">
            <div className="w-full md:w-full py-10 px-5 md:px-10">
              <NewUserForm onSubmit={onSubmit} />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default NewUser;
