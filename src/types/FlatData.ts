/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IFlatData {
  id_cliente: number;
  profesion:  string;
  precio:     number;
  id_usuario:  number;
  usuario:     string;
  password:    string;
  profile_img?: string;
  createdAt:   Date;
  updatedAt?:   Date;
  fk_persona?:   any;
  id_persona:       number;
  nombres:          string;
  apellidos:        string;
  cedula:           string;
  telefono:         string;
  email:            string;
  direccion:        string;
  genero:           string;
  fecha_nacimiento: Date;
  rol:              number;
}

