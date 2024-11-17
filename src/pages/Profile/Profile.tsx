import { useEffect } from "react";
import { EditProfile, PerfilComponent, Title } from "../../components";
import { useLocation, useNavigate } from "react-router-dom";
import { useLogout } from "../../hooks";
import { validateToken } from "../../api";
import { toast } from "sonner";

export default function Profile() {
  const logout = useLogout();
  const navigate = useNavigate();
  // tomar edit param de url
  const location = useLocation();

  useEffect(() => {
    const verifySession = async () => {
      const isValidToken = await validateToken();
      if (!isValidToken) {
        logout();
        navigate("/login");
        toast.message("Por favor, inicia sesión para acceder");
      }
    };
    verifySession();
  }, [location, navigate])
  
  
  const searchParams = new URLSearchParams(location.search);
  const isEdit = searchParams.get("edit");


  return (
    <div className="">
      <Title size="large" color="gray-800" position="left">
        {isEdit !== null && isEdit === "true" ? "Actualiza tu Perfil" : "Mi Perfil"}
      </Title>
      {isEdit !== null && isEdit === "true" ? <EditProfile /> : <PerfilComponent />}
    </div>
  );
}
