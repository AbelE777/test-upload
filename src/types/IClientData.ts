export interface IClientData {
  id_cliente: number;
  profesion:  string;
  zona:  string;
  precio:     number;
  createdAt:  Date;
  updatedAt:  Date;
  fk_usuario: FkUsuario;
}

interface FkUsuario {
  id_usuario:  number;
  usuario:     string;
  password:    string;
  rol:         number;
  profile_img: string;
  createdAt:   Date;
  updatedAt:   Date;
  fk_persona:  FkPersona;
}

interface FkPersona {
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
  createdAt:        Date;
  updatedAt:        Date;
}
