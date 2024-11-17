/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { accessTokenUserExists, removeFromLocalStorage } from "../utils";
import { INewClientFormFields, IUserRegistrationFormValues } from "../types";

interface Props {
  username: string;
  password: string;
}
const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export async function signIn(credentials: Props) {
  try {
    const response = await instance.post("auth/sign-in", credentials);

    return response.data;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
}

export const validateToken = async () => {
  const access_token = localStorage.getItem("access_token");
  if (!accessTokenUserExists()) return false;

  try {
    const response = await instance.get("auth/validate-token", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    // console.log('response', response)
    if (response) {
      // El token es válido
      return true;
    } else {
      // El token no es válido, el usuario debe iniciar sesión nuevamente
      removeFromLocalStorage();
      return false;
    }
  } catch (error) {
    console.error("Error al validar el token:", error);
    return false;
  }
};

// CREAR USUARIO CLIENTE
export const createUserCliente = async (
  data: INewClientFormFields
): Promise<any> => {
  const access_token = localStorage.getItem("access_token");
  if (!accessTokenUserExists())
    return Promise.reject("No hay un token de acceso");
  try {
    const response = await instance.post("auth/create-user", data, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    return response;
  } catch (error) {
    console.log("error createUserCliente", error);
    return Promise.reject(error);
  }
};

// UPLOAD FILE
export const uploadFile = async (
  data: FormData
): Promise<any> => {
  const access_token = localStorage.getItem("access_token");
  if (!accessTokenUserExists())
    return Promise.reject("No hay un token de acceso");
  try {
    const response = await instance.post("files/upload-file", data, {
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (error) {
    console.log("error uploadFile", error);
    return Promise.reject(error);
  }
};

// GET GROUP FILES
export const getGroupFiles = async (active=1) => {
  const access_token = localStorage.getItem("access_token");
  if (!accessTokenUserExists())
    return Promise.reject("No hay un token de acceso");

  try {
    const response = await instance.get(`files/groups?active=${active}`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    return response;
  } catch (error) {
    console.log("error getGroupFiles", error);
    return Promise.reject(error);
  }
};

export const downloadFile = async (fileId: number, fileName: string) => {
  const access_token = localStorage.getItem("access_token");
  if (!accessTokenUserExists())
    return Promise.reject("No hay un token de acceso");
  try {
    const response = await instance.get(`files/download/${fileId}`, {
      responseType: "blob", // recibir el archivo como blob
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    // Crear un enlace para descargar el blob
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", fileName); // Nombre del archivo
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (error) {
    console.error("Error al descargar el archivo:", error);
    throw Promise.reject(error);
  }
};

// por defecto eliminara, active = 0, pasara de estado 1 a 0 (inactivo)
export const deleteOrRestoreFileGroup = async (groupId: number, active: number = 0) => {
  const access_token = localStorage.getItem("access_token");
  if (!accessTokenUserExists())
    return Promise.reject("No hay un token de acceso");
  try {
    const response = await instance.delete(`files/delete/${groupId}?active=${active}`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    console.log(response)
  } catch (error) {
    console.error("Error al eliminar el grupo:", error);
    throw Promise.reject(error);
  }
};

export const getFileUrl = async (fileId: number) => {
  const access_token = localStorage.getItem("access_token");
  if (!accessTokenUserExists())
    return Promise.reject("No hay un token de acceso");

  try {
    return await instance.get(`files/view/${fileId}`, {
      responseType: "arraybuffer",
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
  } catch (error) {
    throw Promise.reject(error);
  }
};

export const downloadAllFiles = async (groupId: number, title:string) => {
  const access_token = localStorage.getItem("access_token");
  if (!access_token) {
    console.log("No hay un token de acceso");
    return;
  }

  try {
    const response = await instance.get(`files/download-all/${groupId}`, {
      headers: {
        Authorization: `Bearer ${access_token}`
      },
      responseType: 'blob'
    });

    const fileUrl = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = fileUrl;
    link.setAttribute('download', `grupo-${groupId}-${title.replace(/\s+/g, '-')}.zip`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (error) {
    throw Promise.reject(error);
  }
};


// CREAR USUARIO ADMIN O EMPLEADO
export const createCommonUser = async (
  data: IUserRegistrationFormValues
): Promise<any> => {
  const access_token = localStorage.getItem("access_token");
  if (!accessTokenUserExists())
    return Promise.reject("No hay un token de acceso");
  try {
    const response = await instance.post("auth/create-user", data, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    return response;
  } catch (error) {
    console.log("error createCommonUser", error);
    return Promise.reject(error);
  }
};

// TRAER SOLO USUARIOS CLIENTES
export const getClientes = async (): Promise<any> => {
  const access_token = localStorage.getItem("access_token");
  if (!accessTokenUserExists())
    return Promise.reject("No hay un token de acceso");
  try {
    const response = await instance.get("users/clientes", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    return response;
  } catch (error) {
    console.log("error getClientes", error);
    return Promise.reject(error);
  }
};

export const getClienteById = async (id: number): Promise<any> => {
  const access_token = localStorage.getItem("access_token");
  if (!accessTokenUserExists())
    return Promise.reject("No hay un token de acceso");
  try {
    const response = await instance.get(`users/clientes/${id}`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    return response;
  } catch (error) {
    console.log("error getClienteById", error);
    return Promise.reject(error);
  }
};

// TRAER SOLO USUARIOS
export const getCommonUsers = async (): Promise<any> => {
  const access_token = localStorage.getItem("access_token");
  if (!accessTokenUserExists())
    return Promise.reject("No hay un token de acceso");
  try {
    const response = await instance.get("users", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    return response;
  } catch (error) {
    console.log("error getCommonUsers", error);
    return Promise.reject(error);
  }
};

// ACTUALIZAR IMAGEN PERFIL
export const updateProfilePic = async (
  userid: number,
  imgUrl: string
): Promise<any> => {
  const access_token = localStorage.getItem("access_token");
  if (!accessTokenUserExists())
    return Promise.reject("No hay un token de acceso");
  try {
    const response = await instance.put(
      `users/update-profile/${userid}`,
      { imgUrl },
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.log("error updateProfilePic", error);
    return Promise.reject(error);
  }
};

// ACTUALIZAR DATOS PERFIL
export const updateProfileData = async (
  userid: number,
  data: any
): Promise<any> => {
  const access_token = localStorage.getItem("access_token");
  if (!accessTokenUserExists())
    return Promise.reject("No hay un token de acceso");
  try {
    const response = await instance.put(
      `users/update-profile-data/${userid}`,
      { ...data },
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.log("error updateProfilePic", error);
    return Promise.reject(error);
  }
};
