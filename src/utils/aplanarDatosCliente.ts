import { IClientData, IFlatData } from "../types";

export function aplanarDatosCliente(clientes: IClientData[]): IFlatData[] {
  const datosAplanados: IFlatData[] = [];
  clientes.forEach((cliente) => {
    const fila = {
      id_cliente: cliente.id_cliente,
      profesion: cliente.profesion,
      precio: cliente.precio,
      ...cliente.fk_usuario,
      ...cliente.fk_usuario.fk_persona,
    };
    datosAplanados.push(fila);
  });
  datosAplanados.map((x) => {
    delete x.updatedAt;
    delete x.fk_persona;
    return true;
  });
  return datosAplanados;
}