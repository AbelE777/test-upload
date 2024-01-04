import { useEffect, useState } from "react";
import { Title, UsersTable } from "../../components";
import { getCommonUsers } from "../../api";
import { toast } from 'sonner';
import { useLogout, useVerifyRol } from "../../hooks";

const Users = () => {
  const verifyRolAndRedirect = useVerifyRol();
  useEffect(() => {
    verifyRolAndRedirect(); // Verifica el rol y realiza la redirección si es necesario
  }, []);
  const logout = useLogout()
  const [users, setUsers] = useState([])
  const TABLE_HEAD = [
    "Cliente",
    "Usuario",
    "Identificación",
    "Rol",
    "Teléfono",
    "Acción",
  ];

  useEffect(() => {
    getCommonUsers()
      .then((response) => {   
        console.log(response)   
        setUsers(response.data)  
        // if(Array.isArray(response.data)) toast.success("OK!")
      })
      .catch((error) => {
        // La Promesa fue rechazada debido a un error
        console.error("Error al traer datos de clientes:", error);
        toast.error("Error al traer datos de clientes")
        // if(Array.isArray(error.response.data.message)) toast.error(error.response.data.message[0])
        // else toast.error(error.response.data.message)
        if(error.response.status === 401) {
          logout()
        }
      });
  }, [])

  return (
    <div className="">
      <Title size="large" color="gray-800" position="left">
        Usuarios
      </Title>

      <div className="md:mx-14">
        <UsersTable tableHead={TABLE_HEAD} tableData={users}/>
      </div>
    </div>
  )
}

export default Users