import moment from "moment"

export const getDateShortFormat = (fecha: string) => {
  return String(moment(fecha).format('YYYY-MM-DD'))
}