// types/registration.d.ts
export interface INewClientFormFields {
  nombres: string;
  apellidos: string;
  cedula:string;
  telefono:string;
  direccion: string;
  email: string;
  genero: string;
  fecha_nacimiento: Date | null;
  rol?: number | null;
  username: string;
  password: string;
  profesion:  string;
  precio: number | null;
  zona: string
}

export interface INewClientFormFieldsResponse {
  success: boolean;
  message: string;
}

