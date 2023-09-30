import {
  HiMagnifyingGlass,
  HiUserPlus,
  HiOutlineDocumentText,
  HiOutlinePencil,
  HiArrowPath,
  HiOutlineEye,
  HiChevronDown,
  HiChevronUp,
} from "react-icons/hi2";
import * as XLSX from "xlsx";
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
import { IClientData, IModalData } from "../../types";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Modal, SinResultados } from "..";
import { motion } from "framer-motion";
import xlsxLogo from "../../assets/svg/excel.svg";
import { aplanarDatosCliente, quitarTildes, setTableHeight } from "../../utils";
import { getClientes } from "../../api";
import { useLogout } from "../../hooks";
import { toast } from "sonner";
import { isLoadingState } from "../../recoil/atoms";
import { useRecoilState } from "recoil";

interface Props {
  tableData: IClientData[];
  tableHead: string[];
}
const TABS = [
  {
    label: "Todos",
    value: "todos",
  },
  {
    label: "Concurrentes",
    value: "concurrentes",
  },
  {
    label: "SinRX",
    value: "sinrx",
  },
];

const ClientesTable = ({ tableData, tableHead }: Props) => {
  const logout = useLogout();
  const initialValue = {
    direccion: "",
    fecha_nacimiento: null,
    createdAt: null,
    genero: "",
    profile_img: "",
    telefono: "",
    nombres: "",
  };
  const [, setIsLoading] = useRecoilState(isLoadingState);
  const [modalConfig, setModalConfig] = useState<{
    open: boolean;
    data: IModalData;
  }>({ open: false, data: initialValue });
  const [inputFilter, setInputFilter] = useState("");
  const [order, setOrder] = useState("ASC");
  // const [isSorting, setIsSorting] = useState(false);
  const [headClicked, setHeadClicked] = useState("");
  const [filteredData, setFilteredData] = useState<IClientData[]>(tableData);
  console.log('tableData',tableData)
  function convertirTablaAXLSX() {
    const datosAplanados = aplanarDatosCliente(filteredData);
    console.log(datosAplanados);
    const libro = XLSX.utils.json_to_sheet(datosAplanados);
    const libroDeTrabajo = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(libroDeTrabajo, libro, "MiHojaDeCalculo");
    XLSX.writeFile(libroDeTrabajo, "datos_clientes.xlsx");
  }

  useEffect(() => {
    setTableHeight();
    window.addEventListener("resize", setTableHeight);
    return () => {
      window.removeEventListener("resize", setTableHeight);
    };
  }, [inputFilter, order]);

  const handleOpenModal = (modalData: IModalData) => {
    setModalConfig({ open: !modalConfig.open, data: modalData });
  };

  const refreshTableData = () => {
    setIsLoading(true);
    getClientes()
      .then((response) => {
        console.log(response);
        setFilteredData(response.data);
        // if(Array.isArray(response.data)) toast.success("OK!")
      })
      .catch((error) => {
        // La Promesa fue rechazada debido a un error
        console.error("Error al traer datos de clientes:", error);
        toast.error("Error al traer datos de clientes");
        // if(Array.isArray(error.response.data.message)) toast.error(error.response.data.message[0])
        // else toast.error(error.response.data.message)
        if (error.response.status === 401) {
          logout();
        }
      });
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  const sorting = (col: string) => {
    // setIsSorting(true);
    setHeadClicked(col);
    if (order === "ASC") {
      const sorted = [...filteredData].sort((a, b) => {
        if (col.toLowerCase() === "cliente")
          return a.fk_usuario.fk_persona.nombres.toLowerCase() >
            b.fk_usuario.fk_persona.nombres.toLowerCase()
            ? 1
            : -1;
        if (col.toLowerCase() === "usuario")
          return a.fk_usuario.usuario.toLowerCase() >
            b.fk_usuario.usuario.toLowerCase()
            ? 1
            : -1;
        if (col.toLowerCase() === "identificación")
          return a.fk_usuario.fk_persona.cedula > b.fk_usuario.fk_persona.cedula
            ? 1
            : -1;
        if (col.toLowerCase() === "precio") return a.precio > b.precio ? 1 : -1;
        if (col.toLowerCase() === "profesión")
          return a.profesion > b.profesion ? 1 : -1;
        else return 3;
      });
      setFilteredData(sorted);
      setOrder("DSC");
    }
    if (order === "DSC") {
      const sorted = [...filteredData].sort((a, b) => {
        if (col.toLowerCase() === "cliente")
          return a.fk_usuario.fk_persona.nombres.toLowerCase() <
            b.fk_usuario.fk_persona.nombres.toLowerCase()
            ? 1
            : -1;
        if (col.toLowerCase() === "usuario")
          return a.fk_usuario.usuario.toLowerCase() <
            b.fk_usuario.usuario.toLowerCase()
            ? 1
            : -1;
        if (col.toLowerCase() === "identificación")
          return a.fk_usuario.fk_persona.cedula < b.fk_usuario.fk_persona.cedula
            ? 1
            : -1;
        if (col.toLowerCase() === "precio") return a.precio < b.precio ? 1 : -1;
        if (col.toLowerCase() === "profesión")
          return a.profesion < b.profesion ? 1 : -1;
        else return 3;
      });
      setFilteredData(sorted);
      setOrder("ASC");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputFilter(val);
    const filtered = tableData.filter((data: IClientData) => {
      const searchstring = val.toLowerCase();
      const { precio, profesion, fk_usuario, zona } = data;
      const { fk_persona, usuario } = fk_usuario;
      const { email, cedula, genero, telefono } = fk_persona;
      const nombres =
        fk_persona.nombres.toLowerCase() +
        " " +
        fk_persona.apellidos.toLowerCase();
      const res =
        quitarTildes(nombres.toLowerCase()).includes(searchstring) ||
        precio.toString().includes(searchstring) ||
        telefono.toString().includes(searchstring) ||
        genero.toLowerCase().includes(searchstring) ||
        zona.toLowerCase().includes(searchstring) ||
        quitarTildes(profesion.toLowerCase()).includes(searchstring) ||
        quitarTildes(usuario).includes(searchstring) ||
        cedula.includes(searchstring) ||
        quitarTildes(email.toLowerCase()).includes(searchstring);
      return res;
    });
    setFilteredData(filtered);
  };

  useEffect(() => {
    setFilteredData(tableData); // Inicialmente, los datos filtrados son los mismos que los datos iniciales
  }, [tableData]);
  // useEffect(() => {
  //   refreshTableData();
  // }, []);

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
        <div className="mb-8 flex items-center justify-center md:justify-end gap-8">
          <div className="flex shrink-0  gap-2 sm:flex-row">
            <Tooltip
              content="Descargar Datos"
              className="bg-gray-200 text-gray-800"
            >
              <button onClick={convertirTablaAXLSX}>
                <img src={xlsxLogo} alt="logo btn excel" width={40} />
              </button>
            </Tooltip>
            <Tooltip
              content="Actualizar Tabla"
              className="bg-gray-200 text-gray-800"
            >
              <IconButton
                color="indigo"
                ripple={true}
                onClick={refreshTableData}
              >
                <motion.div
                  whileHover={{ rotate: 180 }}
                  transition={{ duration: 0.5 }}
                  className="cursor-pointer"
                >
                  <HiArrowPath size={25} />
                </motion.div>
              </IconButton>
            </Tooltip>
            <Link to="/new_client">
              <Button
                className="flex items-center gap-3 font-medium bg-blue-500 dark:bg-teal-500"
                size="sm"
                // color="blue"
              >
                <HiUserPlus size={22} strokeWidth={1} /> Añadir nuevo cliente
              </Button>
            </Link>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <Tabs value="todos" className="w-full md:w-max">
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
              label="Búsqueda"
              color="blue"
              icon={<HiMagnifyingGlass className="h-5 w-5" />}
              onChange={(e) => {
                handleInputChange(e);
              }}
              value={inputFilter}
              className="dark:text-gray-200 dark:font-thin"
            />
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-hidden px-0">
        {filteredData.length > 0 && headClicked.length > 0 && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={{
              hidden: { opacity: 0, y: 10 }, // Inicialmente oculto
              visible: { opacity: 1, y: 0, transition: { duration: 0.7 } }, // Visible con animación de 0.5 segundos
              exit: { opacity: 0, y: 10, transition: { duration: 0.7 } }, // Oculto con animación de 0.5 segundos
            }}
          >
            <Button
              size="sm"
              // color="blue"
              className="flex ml-5 font-medium bg-blue-600 dark:bg-teal-500"
              onClick={() => {
                setFilteredData(tableData);
                // setIsSorting(false);
                setHeadClicked("");
                setOrder("ASC");
              }}
            >
              Restablecer orden
            </Button>
          </motion.div>
        )}
        {filteredData.length > 0 ? (
          <table
            id="miTabla"
            className="mt-4 w-full flex flex-row flex-nowrap min-w-max table-auto text-left"
          >
            <thead className="">
              {filteredData.map((head, index) => (
                <tr
                  className="flex flex-col flex-nowrap sm:table-row mb-2 sm:mb-0"
                  key={`${index}+${head.createdAt}`}
                >
                  {tableHead.map((head, index) => (
                    <Tooltip
                      placement="top-end"
                      content={`Ordenar por ${
                        head === "Cliente" ? "Nombre Cliente" : head
                      }`}
                      className="bg-gray-200 text-gray-800"
                      key={head}
                    >
                      <th
                        onClick={() => {
                          if (head === "Acción") return;
                          sorting(head);
                        }}
                        className="h-[min-content] sm:h-auto md:h-auto cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50 dark:bg-gray-900"
                      >
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className={`dark:text-gray-200 flex items-center justify-between gap-2 font-normal leading-none opacity-70`}
                        >
                          {head}{" "}
                          {index !== tableHead.length - 1 &&
                            headClicked === head &&
                            (order === "ASC" ? (
                              <HiChevronUp className="w-4 h-4 transition-transform" />
                            ) : (
                              <HiChevronDown className="w-4 h-4" />
                            ))}
                        </Typography>
                      </th>
                    </Tooltip>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="flex-1 sm:flex-none">
              {filteredData.map((cliente, index) => {
                const { profesion, createdAt, precio, fk_usuario, zona } =
                  cliente;
                const { profile_img, fk_persona, usuario } = fk_usuario;
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
                      <div className="block md:flex items-center gap-3">
                        <Avatar src={profile_img} alt={nombres} size="sm" />
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal dark:text-gray-400"
                          >
                            {nombres} {apellidos}
                          </Typography>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70 dark:text-gray-400"
                          >
                            {email}
                          </Typography>
                        </div>
                        <div className="text-left md:text-center grow">
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
                          className="font-normal dark:text-gray-400"
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
                          value={`$ ${precio}`}
                          color="green"
                          className="dark:text-gray-200 font-medium"
                        />
                      </div>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-medium dark:text-gray-200"
                      >
                        {profesion}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-medium dark:text-gray-200"
                      >
                        {zona}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Tooltip content="Editar Cliente">
                        <Link to={`/clients/${cliente.id_cliente}`}>
                          <IconButton variant="text">
                            <motion.div
                              whileHover={{ x: [0, -5, 5, -5, 0] }}
                              transition={{ duration: 0.3 }}
                              className="cursor-pointer"
                            >
                              <HiOutlinePencil
                                strokeWidth={2}
                                className="h-4 w-4 text-blue-800"
                              />
                            </motion.div>
                          </IconButton>
                        </Link>
                      </Tooltip>
                      <Tooltip content="Facturar">
                        <Link to={`/facturacion?id=${cliente.id_cliente}`}>
                          <IconButton variant="text">
                            <motion.div
                              whileHover={{ x: [0, -5, 5, -5, 0] }}
                              transition={{ duration: 0.3 }}
                              className="cursor-pointer"
                            >
                              <HiOutlineDocumentText
                                strokeWidth={2}
                                className="h-4 w-4 text-blue-800"
                              />
                            </motion.div>
                          </IconButton>
                        </Link>
                      </Tooltip>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <SinResultados />
        )}
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          Page 1 of 10
        </Typography>
        <div className="flex gap-2">
          <Button variant="outlined" size="sm">
            Previous
          </Button>
          <Button variant="outlined" size="sm">
            Next
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ClientesTable;
