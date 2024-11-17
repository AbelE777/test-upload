import moment from "moment";

export function getFormattedLongDate(dateString: string) {
  const date = moment(dateString);

  // Mapeo de días de la semana y meses en español
  const diasSemana = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ];
  const meses = [
    "enero",
    "febrero",
    "marzo",
    "abril",
    "mayo",
    "junio",
    "julio",
    "agosto",
    "septiembre",
    "octubre",
    "noviembre",
    "diciembre",
  ];
  const diaSemana = diasSemana[date.day()];

  const dia = date.date();
  const ano = date.year();
  const month = meses[date.month()];

  const horas = date.format("HH:mm");

  // Formatear la fecha
  return `${diaSemana} ${dia} de ${month} del ${ano} a las ${horas}`;
}