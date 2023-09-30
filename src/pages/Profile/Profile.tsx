import { EditProfile, PerfilComponent, Title } from "../../components";
import { useLocation } from "react-router-dom";

export default function Profile() {
  // tomar edit param de url
  const location = useLocation();
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
