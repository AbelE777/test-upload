import { Input } from "@material-tailwind/react";
import { IClientData } from "../../types";
import {
  HiOutlineUser,
  HiMiniDevicePhoneMobile,
  HiMiniAtSymbol,
} from "react-icons/hi2";

type Props = {
  clienteSeleccionado: IClientData | undefined;
};

const VerticalTable = ({ clienteSeleccionado }: Props) => {
  const nombres = clienteSeleccionado?.fk_usuario.fk_persona.nombres
  const apellidos = clienteSeleccionado?.fk_usuario.fk_persona.apellidos
  const email = clienteSeleccionado?.fk_usuario.fk_persona.email
  const telefono = clienteSeleccionado?.fk_usuario.fk_persona.telefono
  const clases = "dark:text-gray-100 cursor-not-allowed"

  const nombresApellidos = `${nombres} ${apellidos}`;
  return (
    <section className={`md:w-4/5 md:mx-auto my-10`}>
      <div className="w-full block">
        <div className="w-full mb-4">
          <Input
            readOnly
            color="blue"
            size="lg"
            crossOrigin="true"
            label="Nombres"
            icon={<HiOutlineUser className="h-5 w-5 text-blue-gray-600" />}
            value={nombresApellidos || ""}
            className={clases}
          />
        </div>

        <div className="w-full mb-4">
          <Input
            readOnly
            color="blue"
            size="lg"
            crossOrigin="true"
            label="Correo"
            icon={<HiMiniAtSymbol className="h-5 w-5 text-blue-gray-600" />}
            value={email || ""}
            type="email"
            className={clases}
          />
        </div>
      </div>
      <div className="w-full block md:flex gap-3">
        <div className="mb-4 w-full">
          <Input
            readOnly
            color="blue"
            size="lg"
            crossOrigin="true"
            label="Teléfono"
            icon={
              <HiMiniDevicePhoneMobile className="h-5 w-5 text-blue-gray-600" />
            }
            value={telefono || ""}
            type="number"
            className={clases}
          />
        </div>
      </div>
    </section>
  );
};

export default VerticalTable;
