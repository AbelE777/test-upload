import { Title } from "../../components";
import { SubmitHandler } from "react-hook-form";
import { INewClientFormFields } from "../../types";
import { motion } from "framer-motion";
import NewClientForm from "./components/NewClientForm";
import { createUserCliente } from "../../api";
import { toast } from 'sonner';
import { useNavigate } from "react-router-dom";

const NewClient = () => {
  const navigate = useNavigate()
  const onSubmit: SubmitHandler<INewClientFormFields> = async (data) => {
    data.rol = Number(3); // rol cliente
    data.precio = Number(data.precio);
    createUserCliente(data)
      .then((response) => {   
        console.log(response)     
        if(response.status === 201){
          toast.success("Cliente Añadido con éxito!")
          navigate('/clients')
        }
      })
      .catch((error) => {
        // La Promesa fue rechazada debido a un error
        // Puedes manejar el error aquí
        console.error("Error al llamar a createUserCliente:", error);
        if(Array.isArray(error.response.data.message)) toast.error(error.response.data.message[0])
        else toast.error(error.response.data.message)
      });
    // console.log(data)
    // const from = getFromPath(location);
    // navigate('/clients');
  };

  return (
    <div className="">
      <Title size="large" color="gray-800" position="left">
        Nuevo Cliente
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
              <NewClientForm onSubmit={onSubmit} />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default NewClient;
