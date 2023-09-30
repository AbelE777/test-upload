export function validadorCedula(cedula:string) {
  const  cad = cedula.trim();
  let total = 0;
  const longitud = cedula.length;
  const longcheck = longitud - 1;

  if (cad !== "" && longitud === 10) {
    for (let i = 0; i < longcheck; i++) {
      if (i % 2 === 0) {
        let aux = Number(cad.charAt(i)) * 2;
        if (aux > 9) aux -= 9;
        total += aux;
      } else {
        total += parseInt(cad.charAt(i)); // parseInt o concatenará en lugar de sumar
      }
    }

    total = total % 10 ? 10 - (total % 10) : 0;
  }
  if (Number(cad.charAt(longitud - 1)) == total) {
    return true;
  } else {
    return false;
  }
}