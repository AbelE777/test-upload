import moment from "moment"

export const getDateMediumFormat = (fecha: string) => {
  return String(moment(fecha).format('YYYY-MM-DD / HH:mm'))
}