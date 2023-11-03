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
