import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Chip,
  Typography,
  Tooltip,
  Avatar,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { HiMagnifyingGlass, HiChevronUpDown, HiCheck } from "react-icons/hi2";
import { IClientData } from "../../types";
import { isLoadingState } from "../../recoil/atoms";
import { useRecoilState } from "recoil";
import { SinResultados } from "..";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  clientes: IClientData[];
  setClienteSeleccionado: React.Dispatch<
    React.SetStateAction<IClientData | undefined>
  >;
}

const ModalFacturacion = ({
  open,
  setOpen,
  clientes,
  setClienteSeleccionado,
}: Props) => {
  const [inputFilter, setInputFilter] = useState("");
  const [, setIsLoading] = useRecoilState(isLoadingState);
  useEffect(() => {
    // console.log(clientes)
  }, []);
  const tableHead = [
    "Cliente",
    // "Usuario",
    "Identificación",
    "Precio",
    "Profesión",
    "Acción",
  ];
  const filtered = clientes.filter((data: IClientData) => {
    const searchstring = inputFilter.toLowerCase();
    const { precio, profesion, fk_usuario } = data;
    const { fk_persona, usuario } = fk_usuario;
    const { email, cedula } = fk_usuario.fk_persona;
    const nombres =
      fk_persona.nombres.toLowerCase() +
      " " +
      fk_persona.apellidos.toLowerCase();
    const res =
      nombres.includes(searchstring) ||
      precio.toString().includes(searchstring) ||
      profesion.toLowerCase().includes(searchstring) ||
      usuario.includes(searchstring) ||
      cedula.includes(searchstring) ||
      email.toLowerCase().includes(searchstring);
    return res;
  });
  const handleSelectCliente = (id_cliente: number) => {
    const x = clientes.filter((cliente) => cliente.id_cliente === id_cliente);
    setClienteSeleccionado(x[0]);
    setIsLoading(true);
    setOpen(!open);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  return (
    <Dialog open={open} size="xl" handler={() => setOpen(!open)}>
      <DialogHeader>
        <span className="text-blue-gray-700">Facturar a {inputFilter}</span>
        <div className="px-4 pb-5 md:px-0 md:mx-auto md:w-72">
          <Input
            crossOrigin={""}
            label="Search"
            color="blue"
            icon={<HiMagnifyingGlass className="h-5 w-5" />}
            onChange={(e) => {
              setInputFilter(e.target.value);
            }}
            value={inputFilter}
          />
        </div>
      </DialogHeader>
      <DialogBody
        divider
        className="md:h-auto h-[40rem] md:overflow-hidden overflow-scroll"
      >
        {filtered.length > 0 ? (
          <table className="mt-4 w-full flex flex-row flex-nowrap min-w-max table-auto text-left">
            <thead className="">
              {inputFilter.length > 0 &&
                filtered.map((head, index) => (
                  <tr
                    className="flex flex-col flex-nowrap sm:table-row mb-2 sm:mb-0"
                    key={`${index}+${head.createdAt}`}
                  >
                    {tableHead.map((head, index) => (
                      <th
                        key={index}
                        className="h-[min-content] sm:h-auto md:h-auto cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                      >
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                        >
                          {head}{" "}
                          {index !== tableHead.length - 1 && (
                            <HiChevronUpDown
                              strokeWidth={1}
                              className="h-4 w-4"
                            />
                          )}
                        </Typography>
                      </th>
                    ))}
                  </tr>
                ))}
            </thead>
            <tbody className="flex-1 sm:flex-none">
              {inputFilter.length > 0 &&
                filtered.map(
                  ({ profesion, precio, fk_usuario, id_cliente }, index) => {
                    const { profile_img, fk_persona } = fk_usuario;
                    const { nombres, email, apellidos, cedula } = fk_persona;
                    const isLast = index === clientes.length - 1;
                    const classes = isLast
                      ? "p-4"
                      : "p-4 border-b border-blue-gray-50";

                    return (
                      <tr
                        key={index}
                        className="flex flex-col flex-nowrap sm:table-row mb-2 sm:mb-0"
                      >
                        <td className={classes}>
                          <div className="flex items-center gap-3">
                            <Avatar src={profile_img} alt={nombres} size="sm" />
                            <div className="flex flex-col">
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                {nombres} {apellidos}
                              </Typography>
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal opacity-70"
                              >
                                {email}
                              </Typography>
                            </div>
                          </div>
                        </td>
                        {/* <td className={classes}>
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {usuario}
                        </Typography>
                      </div>
                    </td> */}
                        <td className={classes}>
                          <div className="w-max">
                            <Chip variant="ghost" size="sm" value={cedula} />
                          </div>
                        </td>
                        <td className={classes}>
                          <div className="w-max">
                            <Chip
                              variant="ghost"
                              size="sm"
                              value={`$ ${precio}`}
                              color="green"
                            />
                          </div>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {profesion}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Tooltip content="Edit User">
                            <Button
                              size="sm"
                              color="indigo"
                              className="flex items-center gap-2"
                              onClick={() => handleSelectCliente(id_cliente)}
                            >
                              <HiCheck size={20} />
                              Facturar
                            </Button>
                          </Tooltip>
                        </td>
                      </tr>
                    );
                  }
                )}
            </tbody>
          </table>
        ) : (
          <SinResultados />
        )}
      </DialogBody>
      <DialogFooter>
        <Button
          variant="gradient"
          color="light-blue"
          onClick={() => setOpen(!open)}
          className="mr-1"
        >
          <span>Cancelar</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default ModalFacturacion;
