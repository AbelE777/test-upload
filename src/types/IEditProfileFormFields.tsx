// types/registration.d.ts
export interface IEditProfileFormFields {
  telefono:string;
  direccion: string;
  email: string;
  password?:string;
  profileImg?: File
}