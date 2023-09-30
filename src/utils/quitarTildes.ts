export function quitarTildes(cadena:string) {
  return cadena.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}