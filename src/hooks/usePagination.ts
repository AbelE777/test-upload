import { useState } from "react";
import { IClientData } from "../types";

function usePagination (items: IClientData[], itemsPerPage:number) {
  const [paginaActual, setPaginaActual] = useState(1);

  const paginasTotales = Math.ceil(items.length / itemsPerPage);
  const indiceInicio = (paginaActual - 1) * itemsPerPage;
  const indiceFinal = paginaActual * itemsPerPage;
  const itemsPagina = items.slice(indiceInicio, indiceFinal);

  const handlePaginaAnterior = ()=>{
    if(paginaActual > 1) {
      setPaginaActual(paginaActual - 1);
    }
  }
  
  const handlePaginaSiguiente = () => {
    const paginasTotales = Math.ceil(items.length / itemsPerPage);
    if (paginaActual < paginasTotales) {
      setPaginaActual(paginaActual + 1);
    }
  };

  return {
    paginaActual,
    itemsPagina,
    paginasTotales,
    handlePaginaAnterior,
    handlePaginaSiguiente,
  };
}

export default usePagination;