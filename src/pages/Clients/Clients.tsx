import { getClientes } from "../../api";
import { BreadcrumbsCustom, ClientesTable, Title } from "../../components";
import { toast } from "sonner";
import { useLogout } from "../../hooks";
import { useEffect, useState } from "react";

const Clients = () => {
  const logout = useLogout();
  const [clientes, setClientes] = useState([]);

  const TABLE_HEAD = [
    "Cliente",
    "Usuario",
    "Identificación",
    "Precio",
    "Profesión",
    "Zona",
    "Acción",
  ];
  const labels = [
      {label:"Clientes", link:"/clients"}
    ];
    
  useEffect(() => {
    getClientes()
      .then((response) => {
        console.log(response);
        setClientes(response.data);
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
  }, []);
  

  return (
    <div className="">
      <Title size="large" color="gray-800" position="left">
        Clientes
      </Title>
        <BreadcrumbsCustom labels={labels} />
      <div className="md:mx-14">
        <ClientesTable tableHead={TABLE_HEAD} tableData={clientes} />
      </div>
    </div>
  );
};

export default Clients;
