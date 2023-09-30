import { Button } from "@material-tailwind/react";
import { ModalFacturacion, MyDropZone, Title } from "../../components";
import { useEffect, useState } from "react";
import { useLogout } from "../../hooks";
import { getClientes } from "../../api";
import { toast } from "sonner";
import { IClientData } from "../../types";
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const Facturacion = () => {
  const logout = useLogout();
  const [clientes, setClientes] = useState<IClientData[]>([]);
  const [clienteSeleccionado, setClienteSeleccionado] = useState<IClientData>();
  const [open, setOpen] = useState(false);
  
  // tomar id de url
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get('id')

  useEffect(() => {
    // Aquí puedes utilizar el valor de 'id' en tu componente
    console.log('ID:', id);
  }, [id]);

  useEffect(() => {
    getClientes()
      .then((response) => {
        console.log(response);
        setClientes(response.data);
        if(id) {
          const x = response.data.filter((cliente:IClientData) => cliente.id_cliente === Number(id))
          setClienteSeleccionado(x[0])
          console.log(x)
        }
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
  }, []);

  const handleOpenModal = () => {
    setOpen(true);
  };

  return (
    <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
      >
    <div>
      {open && (
        <ModalFacturacion
          setClienteSeleccionado={setClienteSeleccionado}
          open={open}
          setOpen={setOpen}
          clientes={clientes}
        />
      )}
      <Title size="large" color="gray-800" position="left">
        Facturación
      </Title>

      <div className="flex ml-16">
        <Button
          onClick={handleOpenModal}
          variant="gradient"
          color="blue"
          className="rounded-full"
        >
          Facturar Doctor
        </Button>
      </div>

      {clienteSeleccionado && (
        <div className="md:flex mt-10">
          <div className="md:w-1/2">
            <img
              src={clienteSeleccionado.fk_usuario.profile_img}
              alt={clienteSeleccionado.profesion}
              className="rounded-full w-60 mx-auto md:w-64"
            />
            <p>{clienteSeleccionado.fk_usuario.fk_persona.nombres} {clienteSeleccionado.fk_usuario.fk_persona.apellidos}</p>
          </div>
          <div className="md:w-1/2 flex items-center mx-0 md:mx-8">
            <MyDropZone className="p-16 border-2 rounded-xl border-neutral-400" />
          </div>
        </div>
      )}
    </div>
    </motion.div>
  );
};

export default Facturacion;
