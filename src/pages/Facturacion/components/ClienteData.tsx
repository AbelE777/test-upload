import { Input } from "@material-tailwind/react";
import {
  HiOutlineIdentification,
  HiMiniDevicePhoneMobile,
  HiMiniAtSymbol,
  HiOutlineUser,
} from "react-icons/hi2";

interface PacienteType {
  nombre: string;
  telefono: string;
  cedula: string;
  correo: string;
}

type Props = {
  paciente: PacienteType;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const ClienteData = ({ paciente, onInputChange }: Props) => {
  const darkClass = "dark:text-gray-100";
  return (
    <>
      <div className="w-full block md:flex gap-3">
        <div className="w-full mb-4">
          <Input
            color="blue"
            size="lg"
            crossOrigin="true"
            label="Nombre"
            icon={
              <HiOutlineUser
                className={`h-5 w-5 text-blue-gray-600 ${darkClass}`}
              />
            }
            onChange={onInputChange}
            name="nombre"
            value={paciente.nombre}
            className={darkClass}
          />
        </div>

        <div className="w-full mb-4">
          <Input
            color="blue"
            size="lg"
            crossOrigin="true"
            label="Cédula"
            icon={
              <HiOutlineIdentification
                className={`h-5 w-5 text-blue-gray-600 ${darkClass}`}
              />
            }
            onChange={onInputChange}
            name="cedula"
            value={paciente.cedula}
            type="number"
            className={darkClass}
          />
        </div>
      </div>
      <div className="w-full block md:flex gap-3">
        <div className="mb-4 w-full">
          <Input
            color="blue"
            size="lg"
            crossOrigin="true"
            label="Teléfono"
            icon={
              <HiMiniDevicePhoneMobile
                className={`h-5 w-5 text-blue-gray-600 ${darkClass}`}
              />
            }
            onChange={onInputChange}
            name="telefono"
            value={paciente.telefono}
            type="number"
            className={darkClass}
          />
        </div>
        <div className="mb-4 w-full">
          <Input
            color="blue"
            size="lg"
            crossOrigin="true"
            label="Correo"
            icon={
              <HiMiniAtSymbol
                className={`h-5 w-5 text-blue-gray-600 ${darkClass}`}
              />
            }
            onChange={onInputChange}
            name="correo"
            value={paciente.correo}
            type="email"
            className={darkClass}
          />
        </div>
      </div>
    </>
  );
};

export default ClienteData;
