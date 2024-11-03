import { IconType } from "react-icons";
import { IClientData } from "../../types";

export interface FileWithPreview extends File {
  preview: string;
}

export type ServicesType = {
  id: string;
  nombre: string;
  precios: number[];
  precioSeleccionado?: number | null;
  remision: number;
  files?: FileWithPreview[];
};

export type FilesInterface = {
  id: string;
  nombre: string;
  files: FileWithPreview[];
};

export interface ContentStep4Type {
  activeStep: number;
  selectedServices: ServicesType[];
  clienteSeleccionado: IClientData | undefined;
  dataCliente: {
    label: string;
    value: string | undefined;
    icon: IconType;
  }[];
  dataPaciente: {
    label: string;
    value: string | undefined;
    icon: IconType;
  }[];
}
export interface PacienteType {
  nombre: string;
  telefono: string;
  cedula: string;
  correo: string;
}
