import { BreadcrumbsCustom, Title } from "../../components"
import { motion } from 'framer-motion';
import { SubmitHandler } from "react-hook-form";
import EditClientForm from "./EditClientForm";
import { IClientData, IEditClientFormFields } from "../../types";
import { useEffect, useState } from 'react';
import { getClienteById } from "../../api";
import { toast } from "sonner";
import { useLogout } from "../../hooks";
import { useParams } from "react-router-dom";

const EditClient = () => {
  const logout = useLogout();
  const [cliente, setCliente] = useState<IClientData>();
  
  const { id } = useParams();

  const onSubmit: SubmitHandler<IEditClientFormFields> = async (data) => {
    console.log(data)
  };

  useEffect(() => {    
    const id_ = Number(id)
    
    if(isNaN(id_)) {
      toast.error(`Error: no existe cliente con id "${id}"`);
      return 
    }
    // setIsLoading(true);
    getClienteById(id_)
    .then((response) => {
      console.log(response);
      setCliente(response.data[0]);
      // if(Array.isArray(response.data)) toast.success("OK!")
    })
    .catch((error) => {
      // La Promesa fue rechazada debido a un error
      console.error("Error al traer datos de clientes:", error);
      toast.error("Error al traer datos de clientes");
      // if(Array.isArray(error.response.data.message)) toast.error(error.response.data.message[0])
      // else toast.error(error.response.data.message)
      if (error.response.status === 401) {
        logout();
      }
    });
  }, [id])

  const labels = [
    {label:"Clientes", link:"/clients"},
    {label:"Editar cliente", link:"#"}
  ];
  return (
    <div>
      <Title size="large" color="gray-800" position="left">
        Editar cliente
      </Title>
      <BreadcrumbsCustom labels={labels} />
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
              {cliente && <EditClientForm onSubmit={onSubmit} cliente={cliente} />}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default EditClient