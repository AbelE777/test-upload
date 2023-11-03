import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { useState } from "react";
import { PiToothDuotone } from "react-icons/pi";
import { PiezaDental, Switch } from ".";

interface Props {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  setTotalPiezas: React.Dispatch<
    React.SetStateAction<{ total: number[] | null; tipo: string }>
  >;
  nombre: string;
}

const ModalPiezas = ({ isOpen, setIsOpen, setTotalPiezas, nombre }: Props) => {
  const piezas1 = [18, 17, 16, 15, 14, 13, 12, 11];
  const piezas2 = [21, 22, 23, 24, 25, 26, 27, 28];
  const piezas3 = [48, 47, 46, 45, 44, 43, 42, 41];
  const piezas4 = [31, 32, 33, 34, 35, 36, 37, 38];
  const piezas5 = [55, 54, 53, 52, 51];
  const piezas6 = [61, 62, 63, 64, 65];
  const piezas7 = [85, 84, 83, 82, 81];
  const piezas8 = [71, 72, 73, 74, 75];
  const [piezasTemporal, setPiezasTemporal] = useState<number[]>([]);
  const [tipo, setTipo] = useState("conductometria");

  const handleOk = () => {
    setTotalPiezas({ total: piezasTemporal, tipo });
    setIsOpen(!isOpen);
  };
  const handleCancel = () => {
    setTotalPiezas({ total: [], tipo: "" });
    setIsOpen(!isOpen);
  };
  const darkClass = "dark:bg-gray-900 dark:text-gray-100"

  return (
    <Dialog
      style={{ alignItems: "start" }}
      open={isOpen}
      size="xl"
      handler={() => {}}
      className={darkClass}
    >
      <DialogHeader 
      className={`${darkClass} flex gap-3 items-start justify-center font-normal text-blue-500 uppercase`}>
        Piezas {nombre} <PiToothDuotone size={28} />
      </DialogHeader>
      <DialogBody className={darkClass}>
        <div className="flex items-center justify-center mb-4">
          <Switch setTipo={setTipo} />
        </div>
        <div className="block md:flex justify-center gap-4">
          <div className="flex">
            {piezas1.map((pieza) => (
              <PiezaDental
                key={pieza}
                setPiezasTemporal={setPiezasTemporal}
                piezasTemporal={piezasTemporal}
                position="top"
                numeroPieza={pieza}
              />
            ))}
          </div>
          <div className="flex">
            {piezas2.map((pieza) => (
              <PiezaDental
                key={pieza}
                setPiezasTemporal={setPiezasTemporal}
                piezasTemporal={piezasTemporal}
                position="top"
                numeroPieza={pieza}
              />
            ))}
          </div>
        </div>
        <div className="block md:flex justify-center gap-4">
          <div className="flex">
            {piezas3.map((pieza) => (
              <PiezaDental
                key={pieza}
                setPiezasTemporal={setPiezasTemporal}
                piezasTemporal={piezasTemporal}
                position="bottom"
                numeroPieza={pieza}
              />
            ))}
          </div>
          <div className="flex">
            {piezas4.map((pieza) => (
              <PiezaDental
                key={pieza}
                setPiezasTemporal={setPiezasTemporal}
                piezasTemporal={piezasTemporal}
                position="bottom"
                numeroPieza={pieza}
              />
            ))}
          </div>
        </div>
        <div className="block md:flex justify-center gap-4">
          <div className="flex justify-center">
            {piezas5.map((pieza) => (
              <PiezaDental
                key={pieza}
                setPiezasTemporal={setPiezasTemporal}
                piezasTemporal={piezasTemporal}
                position="top"
                numeroPieza={pieza}
              />
            ))}
          </div>
          <div className="flex justify-center">
            {piezas6.map((pieza) => (
              <PiezaDental
                key={pieza}
                setPiezasTemporal={setPiezasTemporal}
                piezasTemporal={piezasTemporal}
                position="top"
                numeroPieza={pieza}
              />
            ))}
          </div>
        </div>
        <div className="block md:flex justify-center gap-4">
          <div className="flex justify-center">
            {piezas7.map((pieza) => (
              <PiezaDental
                key={pieza}
                setPiezasTemporal={setPiezasTemporal}
                piezasTemporal={piezasTemporal}
                position="bottom"
                numeroPieza={pieza}
              />
            ))}
          </div>
          <div className="flex justify-center">
            {piezas8.map((pieza) => (
              <PiezaDental
                key={pieza}
                setPiezasTemporal={setPiezasTemporal}
                piezasTemporal={piezasTemporal}
                position="bottom"
                numeroPieza={pieza}
              />
            ))}
          </div>
        </div>
      </DialogBody>

      <DialogFooter>
        <Button
          variant="outlined"
          color="gray"
          onClick={handleCancel}
          className={`mr-1 ${darkClass}`}
        >
          Cancelar
        </Button>
        <Button
          variant="filled"
          color="light-blue"
          onClick={handleOk}
          className="mr-1 uppercase font-bold"
          disabled={piezasTemporal.length === 0}
        >
          Agregar Piezas
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default ModalPiezas;
