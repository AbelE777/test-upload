// types/registration.d.ts
export interface IUserRegistrationFormValues {
  nombres: string;
  apellidos: string;
  direccion: string;
  email: string;
  cedula:string;
  telefono:string;
  username: string;
  password: string;
  fecha_nacimiento: Date;
  confirmPassword: string;
  tyc: boolean;
  rol: number;
}

export interface RegistrationResponse {
  success: boolean;
  message: string;
}

