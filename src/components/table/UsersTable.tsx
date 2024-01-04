import {
  HiMagnifyingGlass,
  HiChevronUpDown,
  HiUserPlus,
  HiOutlinePencil,
  HiOutlineEye,
  HiArrowPath,
  HiChevronLeft,
  HiChevronRight,
} from "react-icons/hi2";
import { PiTrashSimple } from "react-icons/pi";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  Avatar,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import { IModalData, IUsersData } from "../../types";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Modal, SinResultados } from "..";
import { motion } from "framer-motion";
import { quitarTildes, setTableHeight } from "../../utils";
interface Props {
  tableData: IUsersData[];
  tableHead: string[];
}
const TABS = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Monitored",
    value: "monitored",
  },
  {
    label: "Unmonitored",
    value: "unmonitored",
  },
];

const UsersTable = ({ tableData, tableHead }: Props) => {
  const initialValue = {
    direccion: "",
    fecha_nacimiento: null,
    createdAt: null,
    genero: "",
    profile_img: "",
    telefono: "",
    nombres: "",
  };
  const [modalConfig, setModalConfig] = useState<{
    open: boolean;
    data: IModalData;
  }>({ open: false, data: initialValue });
  const [inputFilter, setInputFilter] = useState("");

  useEffect(() => {
    setTableHeight();
    window.addEventListener("resize", setTableHeight);
    return () => {
      window.removeEventListener("resize", setTableHeight);
    };
  }, [inputFilter]);

  const handleOpenModal = (modalData: IModalData) => {
    setModalConfig({ open: !modalConfig.open, data: modalData });
  };

  const filtered = tableData.filter((data: IUsersData) => {
    const searchstring = inputFilter.toLowerCase();
    const { fk_persona, usuario } = data;
    const { email, cedula, genero, telefono } = data.fk_persona;
    const nombres =
      fk_persona.nombres.toLowerCase() +
      " " +
      fk_persona.apellidos.toLowerCase();
    const res =
      quitarTildes(nombres.toLowerCase()).includes(searchstring) ||
      genero.toLowerCase().includes(searchstring) ||
      usuario.includes(searchstring) ||
      telefono.includes(searchstring) ||
      cedula.includes(searchstring) ||
      quitarTildes(email.toLowerCase()).includes(searchstring);
    return res;
  });

  const getRolString = (rol: number) =>
    rol === 1 ? "ADMIN" : rol === 2 ? "EMPLEADO" : "DESCONOCIDO";

  const itemsPorPagina = 5;
  const [paginaActual, setPaginaActual] = useState(1);
  const indiceInicio = (paginaActual - 1) * itemsPorPagina;
  const indiceFinal = paginaActual * itemsPorPagina;
  const itemsPagina = filtered.slice(indiceInicio, indiceFinal);
  const paginasTotales = Math.ceil(filtered.length / itemsPorPagina);

  const handlePaginaAnterior = () => {
    if (paginaActual > 1) {
      setPaginaActual(paginaActual - 1);
    }
  };

  const handlePaginaSiguiente = () => {
    const paginasTotales = Math.ceil(filtered.length / itemsPorPagina);
    if (paginaActual < paginasTotales) {
      setPaginaActual(paginaActual + 1);
    }
  };

  return (
    <Card className="w-full overflow-x-auto dark:bg-gray-900">
      {modalConfig.open && (
        <Modal modalConfig={modalConfig} setModalConfig={setModalConfig} />
      )}
      <CardHeader
        floated={false}
        shadow={false}
        className="rounded-none dark:bg-gray-900"
      >
        <div className="mb-8 flex items-center justify-end gap-8">
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <IconButton color="indigo" ripple={true}>
              <motion.div
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.5 }}
                className="cursor-pointer"
              >
                <HiArrowPath size={25} />
              </motion.div>
            </IconButton>
            <Link to="/new_user">
              <Button
                className="flex items-center gap-3 bg-blue-500 font-medium"
                size="sm"
              >
                <HiUserPlus strokeWidth={1} size={22} /> Añadir nuevo usuario
              </Button>
            </Link>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <Tabs value="all" className="w-full md:w-max">
            <TabsHeader>
              {TABS.map(({ label, value }) => (
                <Tab key={value} value={value}>
                  &nbsp;&nbsp;{label}&nbsp;&nbsp;
                </Tab>
              ))}
            </TabsHeader>
          </Tabs>
          <div className="w-full md:w-72">
            <Input
              crossOrigin={""}
              className="dark:text-gray-200 font-thin"
              label="Búsqueda"
              color="blue"
              icon={<HiMagnifyingGlass className="h-5 w-5" />}
              onChange={(e) => {
                setInputFilter(e.target.value);
              }}
              value={inputFilter}
            />
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-hidden px-0">
        {itemsPagina.length > 0 ? (
          <table className="mt-4 w-full flex flex-row flex-nowrap min-w-max table-auto text-left">
            <thead className="">
              {itemsPagina.map((head, index) => (
                <tr
                  className="flex flex-col flex-nowrap sm:table-row mb-2 sm:mb-0"
                  key={`${index}+${head.createdAt}`}
                >
                  {tableHead.map((head, index) => (
                    <th
                      key={head}
                      className="h-[min-content] sm:h-auto md:h-auto cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50 dark:bg-gray-900"
                    >
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="flex items-center justify-between gap-2 font-normal leading-none opacity-70 dark:text-gray-200"
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
              {itemsPagina.map(
                (
                  { createdAt, profile_img, fk_persona, usuario, rol },
                  index
                ) => {
                  const {
                    nombres,
                    email,
                    apellidos,
                    cedula,
                    direccion,
                    genero,
                    telefono,
                    fecha_nacimiento,
                  } = fk_persona;
                  const isLast = index === tableData.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";
                  const modalData = {
                    nombres: `${nombres} ${apellidos}`,
                    profile_img,
                    direccion,
                    genero,
                    telefono,
                    fecha_nacimiento,
                    createdAt,
                  };

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
                              className="font-normal dark:text-gray-200"
                            >
                              {nombres} {apellidos}
                            </Typography>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal opacity-70 dark:text-gray-200"
                            >
                              {email}
                            </Typography>
                          </div>
                          <div className="text-center grow">
                            <Tooltip content={`Ver detalles de ${nombres}`}>
                              <IconButton
                                variant="text"
                                onClick={() => handleOpenModal(modalData)}
                              >
                                <HiOutlineEye
                                  size={22}
                                  className="text-gray-600"
                                />
                              </IconButton>
                            </Tooltip>
                          </div>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal dark:text-gray-200"
                          >
                            {usuario}
                          </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="w-max">
                          <Chip
                            variant="ghost"
                            color="indigo"
                            size="sm"
                            value={cedula}
                            className="dark:text-gray-200 font-medium"
                          />
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="w-max">
                          <Chip
                            variant="ghost"
                            size="sm"
                            value={getRolString(rol)}
                            color="green"
                            className="dark:text-gray-200 font-medium"
                          />
                        </div>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal dark:text-gray-200"
                        >
                          {telefono}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Tooltip content="Editar Usuario">
                          <IconButton variant="text">
                            <motion.div
                              whileHover={{ x: [0, -5, 5, -5, 0] }}
                              transition={{ duration: 0.5 }}
                              className="cursor-pointer"
                            >
                              <HiOutlinePencil
                                strokeWidth={2}
                                className="h-4 w-4 text-blue-800"
                              />
                            </motion.div>
                          </IconButton>
                        </Tooltip>
                        <Tooltip content="Eliminar">
                          <IconButton variant="text">
                            <motion.div
                              whileHover={{ x: [0, -5, 5, -5, 0] }}
                              transition={{ duration: 0.5 }}
                              className="cursor-pointer"
                            >
                              <PiTrashSimple
                                strokeWidth={3}
                                className="h-4 w-4 text-red-400"
                              />
                            </motion.div>
                          </IconButton>
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
      </CardBody>
      <CardFooter className="flex items-center justify-center border-t border-blue-gray-50 p-4">
        <div className="flex gap-2 items-center justify-center">
          <Button
            onClick={handlePaginaAnterior}
            disabled={paginaActual === 1}
            variant="text"
            size="sm"
            className="dark:bg-gray-100 rounded-full"
          >
            <HiChevronLeft size={15} />
          </Button>
          <span className="font-medium text-sm">
            {paginaActual} / {paginasTotales}
          </span>
          <Button
            onClick={handlePaginaSiguiente}
            disabled={paginaActual === paginasTotales}
            variant="text"
            size="sm"
            className="dark:bg-gray-100 rounded-full"
          >
            <HiChevronRight size={15} />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default UsersTable;
