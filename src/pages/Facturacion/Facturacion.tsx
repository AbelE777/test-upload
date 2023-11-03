import {
  Button,
  Stepper,
  Step,
  Typography,
  Alert,
} from "@material-tailwind/react";
import {
  ModalFacturacion,
  Title,
  CustomImage,
  VerticalTable,
} from "../../components";
import React, { FormEvent, useEffect, useState } from "react";
import { useLogout } from "../../hooks";
import { getClientes } from "../../api";
import { IClientData } from "../../types";
import { PiChecks } from "react-icons/pi";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import {
  HiOutlineRectangleStack,
  HiOutlineUser,
  HiOutlineClipboardDocument,
  HiOutlineTrash,
  HiChevronLeft,
  HiChevronRight,
  HiOutlineExclamationCircle,
  HiOutlinePhoto,
  HiMiniExclamationCircle,
  HiShieldCheck,
} from "react-icons/hi2";
import { FaUserDoctor } from "react-icons/fa6";
import { Toaster, toast } from "sonner";
import {
  ModalPiezas,
  ContentStep3,
  ContentStep2,
  ClienteData,
} from "./components";
import {
  ContentStep4Type,
  FileWithPreview,
  PacienteType,
  ServicesType,
} from "./types";

interface IServices {
  id: string;
  nombre: string;
  checked: boolean;
  piezas?: number[];
  tipo_piezas?: string;
  precios: number[];
  precioSeleccionado?: number | null;
  remision: number;
}

const Facturacion = () => {
  const darkClass = "dark:text-gray-100";
  const logout = useLogout();
  const [clientes, setClientes] = useState<IClientData[]>([]);
  const [clienteSeleccionado, setClienteSeleccionado] = useState<IClientData>();
  const [open, setOpen] = useState(false);
  const [openModalPiezas, setOpenModalPiezas] = useState(false);
  const [openModalPiezasPP, setOpenModalPiezasPP] = useState(false);
  const [totalPiezasPeriapical, setTotalPiezasPeriapical] = useState<{
    total: number[] | null;
    tipo: string;
  }>({ total: null, tipo: "" });
  const [totalPiezasPeriapicalPlus, setTotalPiezasPeriapicalPlus] = useState<{
    total: number[] | null;
    tipo: string;
  }>({ total: null, tipo: "" });

  const [openAccordion, setOpenAccordion] = useState<number>(1);
  const [selectedServices, setSelectedServices] = useState<Array<ServicesType>>(
    []
  );
  const [paciente, setPaciente] = useState<PacienteType>({
    nombre: "",
    telefono: "",
    cedula: "",
    correo: "",
  });
  // const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [services, setServices] = useState<IServices[]>([
    {
      id: "panoramica",
      nombre: "Panorámica",
      precios: [13, 15, 16],
      remision: 5,
      checked: false,
      precioSeleccionado: null,
    },
    {
      id: "cefalometrica",
      nombre: "Cefalométrica",
      checked: false,
      precios: [13, 15, 16],
      remision: 5,
      precioSeleccionado: null,
    },
    {
      id: "periapical",
      nombre: "Periapical",
      checked: false,
      piezas: [],
      tipo_piezas: "",
      precios: [8],
      remision: 1,
      precioSeleccionado: 8,
    },
    {
      id: "periapical-plus",
      nombre: "Periapical Plus",
      checked: false,
      piezas: [],
      tipo_piezas: "",
      precios: [10, 16],
      remision: 2,
      precioSeleccionado: null,
    },
    {
      id: "senos-paranasales",
      nombre: "Senos paranasales",
      checked: false,
      precios: [13, 15, 16],
      remision: 5,
      precioSeleccionado: null,
    },
    {
      id: "atm",
      nombre: "ATM (Articulación temporo mandibular)",
      checked: false,
      precios: [13, 15, 16],
      remision: 5,
      precioSeleccionado: null,
    },
    {
      id: "serie-periapical",
      nombre: "Serie Periapical",
      precios: [60, 16],
      remision: 10,
      checked: false,
      precioSeleccionado: null,
    },
  ]);

  const [activeStep, setActiveStep] = useState(0);
  const [isLastStep, setIsLastStep] = useState(false);
  const [isFirstStep, setIsFirstStep] = useState(false);

  const handleNext = () => {
    let errMensaje = "";
    if (activeStep === 0 && !clienteSeleccionado) {
      errMensaje = "Debes seleccionar un doctor";
      // if (!isLastStep) setActiveStep((cur) => cur + 1);
    } else if (activeStep === 1 && !pacienteData(paciente)) {
      errMensaje = "Por favor, completa el formulario";
      // if (!isLastStep) setActiveStep((cur) => cur + 1);
    } else if (activeStep === 2 && !selectedServices.length) {
      errMensaje = "Por favor, Selecciona al menos 1 servicio";
      // if (!isLastStep) setActiveStep((cur) => cur + 1);
    } else if (activeStep === 3) {
      // if (!isLastStep) setActiveStep((cur) => cur + 1);
    }
    if (errMensaje) {
      toast.error(errMensaje);
    }
    if (!isLastStep && !errMensaje) {
      setActiveStep((cur) => cur + 1);
    }
  };
  const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);

  const handleOpenAccordion = (value: number) =>
    setOpenAccordion(openAccordion === value ? 0 : value);

  // tomar id de url
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");

  useEffect(() => {
    getClientes()
      .then((response) => {
        setClientes(response.data);
        if (id) {
          const x = response.data.filter(
            (cliente: IClientData) => cliente.id_cliente === Number(id)
          );
          setClienteSeleccionado(x[0]);
        }
      })
      .catch((error) => {
        // La Promesa fue rechazada debido a un error
        console.error("Error al traer datos de clientes:", error);
        toast.error("Error al traer datos de clientes");
        if (error.response.status === 401) {
          logout();
        }
      });
  }, []);

  useEffect(() => {
    // si se ha cerrado el modal y no se selecciono piezas
    if (totalPiezasPeriapical.total?.length === 0) {
      const periapical = document.getElementById("periapical");
      periapical?.click();
    }

    if (
      totalPiezasPeriapical.total?.length &&
      totalPiezasPeriapical.total?.length > 0
    ) {
      const servicesUpdated = services?.map((service) => {
        if (service.id === "periapical") {
          service.piezas = totalPiezasPeriapical.total!;
          service.tipo_piezas = totalPiezasPeriapical.tipo!;
        }
        return service;
      });
      setServices(servicesUpdated);
    }
  }, [totalPiezasPeriapical]);

  useEffect(() => {
    // si se ha cerrado el modal y no se selecciono piezas
    if (totalPiezasPeriapicalPlus.total?.length === 0) {
      const periapicalPlus = document.getElementById("periapical-plus");
      periapicalPlus?.click();
    }
    if (
      totalPiezasPeriapicalPlus.total?.length &&
      totalPiezasPeriapicalPlus.total?.length > 0
    ) {
      const servicesUpdated = services?.map((service) => {
        if (service.id === "periapical-plus") {
          service.piezas = totalPiezasPeriapicalPlus.total!;
          service.tipo_piezas = totalPiezasPeriapicalPlus.tipo!;
        }
        return service;
      });
      setServices(servicesUpdated);
    }
  }, [totalPiezasPeriapicalPlus]);

  const handleOpenModal = () => setOpen(true);

  const onChangeSelectService = (
    service: {
      id: string;
      nombre: string;
      precios: number[];
      precioSeleccionado?: number | null;
      remision: number;
      checked: boolean;
    },
    e: FormEvent<HTMLDivElement>
  ) => {
    const target = e.target as HTMLInputElement;

    const serviceExists = [...selectedServices].find(
      (service_) => service_.id === service.id
    );

    service.checked = target.checked;
    const updatedServices = [...selectedServices];

    if (serviceExists) {
      if (service.id === "periapical") {
        setTotalPiezasPeriapical({ total: null, tipo: "" });
        const servicesUpdated = [...services]?.map((service) => {
          if (service.id === "periapical") {
            service.piezas = undefined;
          }
          service.precioSeleccionado = null;
          return service;
        });
        setServices(servicesUpdated);
      } else if (service.id === "periapical-plus") {
        setTotalPiezasPeriapicalPlus({ total: null, tipo: "" });
        const servicesUpdated = [...services]?.map((service) => {
          if (service.id === "periapical-plus") {
            service.piezas = undefined;
          }
          service.precioSeleccionado = null;
          return service;
        });
        setServices(servicesUpdated);
      } else {
        const servicesUpdated = [...services]?.map((service) => {
          service.precioSeleccionado = null;
          return service;
        });
        setServices(servicesUpdated);
      }
      setSelectedServices(
        [...updatedServices].filter((service_) => service_.id !== service.id)
      );
    } else if (target.checked) {
      if (service.id === "periapical") {
        setOpenModalPiezas(true);
      }
      if (service.id === "periapical-plus") {
        setOpenModalPiezasPP(true);
      }

      updatedServices.push(service);
      setSelectedServices(updatedServices);
    }
  };

  const addFilesToSelectedServices = (
    serviceId: string,
    acceptedFiles: FileWithPreview[]
  ) => {
    setSelectedServices((prevServices) =>
      prevServices.map((prevService) =>
        prevService.id === serviceId
          ? {
              ...prevService,
              files: [...(prevService.files || []), ...acceptedFiles],
            }
          : prevService
      )
    );
  };

  const removeFileFromSelectedServices = (
    serviceId: string,
    fileToRemove: File
  ) => {
    setSelectedServices((prevServices) =>
      prevServices.map((prevService) =>
        prevService.id === serviceId
          ? {
              ...prevService,
              files: prevService?.files?.filter(
                (file) => file !== fileToRemove
              ),
            }
          : prevService
      )
    );
  };

  function pacienteData(paciente: PacienteType): boolean {
    return (
      paciente.nombre.trim() !== "" &&
      paciente.telefono.trim() !== "" &&
      paciente.cedula.trim() !== "" &&
      paciente.correo.trim() !== ""
    );
  }

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setPaciente((prevPaciente) => ({
      ...prevPaciente,
      [name]: value,
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9 }}
    >
      <div>
        {open && (
          <ModalFacturacion
            setClienteSeleccionado={setClienteSeleccionado}
            open={open}
            setOpen={setOpen}
            clientes={clientes}
          />
        )}
        <Title size="large" color="gray-800" position="left">
          Facturación
        </Title>
      </div>

      <Toaster position="top-center" richColors />

      <div className="w-full md:px-24 px-14 mt-10">
        <Stepper
          activeStep={activeStep}
          isLastStep={(value) => setIsLastStep(value)}
          isFirstStep={(value) => setIsFirstStep(value)}
          className="content-center"
          lineClassName="bg-indigo-100"
          activeLineClassName="bg-indigo-500"
        >
          <Step className={"!bg-indigo-700"}>
            <FaUserDoctor
              className={`h-5 w-5 text-white ${
                activeStep === 0 ? "block" : "hidden"
              }`}
            />
            <PiChecks
              strokeWidth={5}
              className={`h-5 w-5 text-white ${
                activeStep !== 0 ? "block" : "hidden"
              }`}
            />
            <div className="absolute -bottom-[2.0rem] w-max text-center">
              {activeStep === 0 && (
                <>
                  <Typography
                    color={activeStep === 0 ? "blue-gray" : "gray"}
                    className={`font-normal ${darkClass}`}
                  >
                    Elige Dr/Dra.
                  </Typography>
                </>
              )}
            </div>
          </Step>
          <Step
            className={activeStep <= 0 ? "!bg-indigo-200" : "!bg-indigo-700"}
          >
            <HiOutlineUser
              className={`h-5 w-5 text-white ${
                activeStep <= 1 ? "block" : "hidden"
              }`}
            />
            <PiChecks
              strokeWidth={5}
              className={`h-5 w-5 text-white ${
                activeStep > 1 ? "block" : "hidden"
              }`}
            />
            <div className="absolute -bottom-[2.0rem] w-max text-center">
              {activeStep === 1 && (
                <>
                  <Typography
                    color={activeStep === 1 ? "blue-gray" : "gray"}
                    className={`font-normal ${darkClass}`}
                  >
                    Datos paciente
                  </Typography>
                </>
              )}
            </div>
          </Step>
          <Step
            className={activeStep <= 1 ? "!bg-indigo-200" : "!bg-indigo-700"}
          >
            <HiOutlineRectangleStack
              className={`h-5 w-5 text-white ${
                activeStep <= 2 ? "block" : "hidden"
              }`}
            />
            <PiChecks
              strokeWidth={5}
              className={`h-5 w-5 text-white ${
                activeStep >= 3 ? "block" : "hidden"
              }`}
            />
            <div className="absolute -bottom-[2.0rem] w-max text-center">
              {activeStep === 2 && (
                <>
                  <Typography
                    color={activeStep === 2 ? "blue-gray" : "gray"}
                    className={`font-normal ${darkClass}`}
                  >
                    Detallar servicio
                  </Typography>
                </>
              )}
            </div>
          </Step>
          <Step
            className={activeStep <= 2 ? "!bg-indigo-200" : "!bg-indigo-700"}
          >
            <HiOutlinePhoto
              className={`h-5 w-5 text-white ${
                activeStep <= 3 ? "block" : "hidden"
              }`}
            />
            <PiChecks
              strokeWidth={5}
              className={`h-5 w-5 text-white ${
                activeStep >= 4 ? "block" : "hidden"
              }`}
            />
            <div className="absolute -bottom-[2.0rem] w-max text-center">
              {activeStep === 3 && (
                <>
                  <Typography
                    color={activeStep === 3 ? "blue-gray" : "gray"}
                    className={`font-normal ${darkClass}`}
                  >
                    Imágenes
                  </Typography>
                </>
              )}
            </div>
          </Step>
          <Step
            className={activeStep === 4 ? "!bg-indigo-700" : "!bg-indigo-200"}
          >
            <HiOutlineClipboardDocument className="h-5 w-5 text-white" />
            <div className="absolute -bottom-[2.0rem] w-max text-center">
              {activeStep === 4 && (
                <>
                  <Typography
                    color={activeStep === 4 ? "blue-gray" : "gray"}
                    className={`font-normal ${darkClass}`}
                  >
                    Resúmen
                  </Typography>
                </>
              )}
            </div>
          </Step>
        </Stepper>

        {openModalPiezas && (
          <ModalPiezas
            nombre="Periapical"
            setTotalPiezas={setTotalPiezasPeriapical}
            isOpen={openModalPiezas}
            setIsOpen={setOpenModalPiezas}
          />
        )}
        {openModalPiezasPP && (
          <ModalPiezas
            nombre="Periapical Plus"
            setTotalPiezas={setTotalPiezasPeriapicalPlus}
            isOpen={openModalPiezasPP}
            setIsOpen={setOpenModalPiezasPP}
          />
        )}

        <section
          className={`md:w-4/5 md:mx-auto my-10 px-4 ${
            activeStep === 0 ? "block" : "hidden"
          }`}
        >
          {!clienteSeleccionado && (
            <div className="flex mt-10">
              <Button
                onClick={handleOpenModal}
                variant="gradient"
                color="blue"
                className="rounded-full mx-auto font-normal"
              >
                Elegir Doctor
              </Button>
            </div>
          )}
          {clienteSeleccionado && (
            <div className="md:flex mt-10 justify-center">
              <div className="md:w-1/2 relative">
                <img
                  src={clienteSeleccionado.fk_usuario.profile_img}
                  alt={clienteSeleccionado.profesion}
                  className="rounded-full w-60 mx-auto md:w-64 shadow-lg"
                />
                <a
                  href="#/"
                  className="absolute top-0 right-0 p-2"
                  onClick={() => setClienteSeleccionado(undefined)}
                >
                  <HiOutlineTrash className="text-blue-gray-900" size={20} />
                </a>
                <VerticalTable clienteSeleccionado={clienteSeleccionado} />
              </div>
            </div>
          )}
        </section>

        <section
          className={`md:w-3/5 md:mx-auto mt-16 mb-10 px-4 ${
            activeStep === 1 ? "block" : "hidden"
          }`}
        >
          <ClienteData paciente={paciente} onInputChange={onInputChange} />
        </section>

        <ContentStep2
          activeStep={activeStep}
          services={services}
          onChangeSelectService={onChangeSelectService}
        />

        <ContentStep3
          activeStep={activeStep}
          selectedServices={selectedServices}
          openAccordion={openAccordion}
          handleOpenAccordion={handleOpenAccordion}
          addFilesToSelectedServices={addFilesToSelectedServices}
          removeFileFromSelectedServices={removeFileFromSelectedServices}
          setSelectedServices={setSelectedServices}
        />

        <ContentStep4
          activeStep={activeStep}
          selectedServices={selectedServices}
          clienteSeleccionado={clienteSeleccionado}
        />

        {/* PREV NEXT BUTTONS */}
        <div className="mt-32 flex justify-between">
          <Button
            onClick={handlePrev}
            disabled={isFirstStep}
            variant="text"
            size="sm"
            className="font-normal rounded-full flex items-center gap-3 border-none dark:text-gray-300 dark:font-medium"
          >
            <HiChevronLeft className="text-blue-gray-900" size={14} /> Anterior
          </Button>
          <Button
            onClick={handleNext}
            disabled={isLastStep ? true : false}
            variant="text"
            size="sm"
            className="font-normal rounded-full flex items-center gap-3 border-none dark:text-gray-300 dark:font-medium"
          >
            Siguiente
            <HiChevronRight className="text-blue-gray-900" size={14} />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default Facturacion;

const ContentStep4 = ({
  activeStep,
  selectedServices,
  clienteSeleccionado,
}: ContentStep4Type) => {
  return (
    <>
      <div className={`mt-10 ${activeStep === 4 ? "block" : "hidden"}`}>
        {selectedServices?.length > 0 ? (
          selectedServices?.map((service) => {
            if (service.files?.length && service.files?.length > 0)
              return (
                <div key={service.id} className="">
                  <h2 className="text-lg uppercase mb-0 dark:text-gray-100">
                    Servicio {service.nombre}
                  </h2>
                  <ul className="mt-0 mb-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-10">
                    {service?.files?.map((file) => (
                      <li key={file.size} className="h-32 rounded-md shadow-lg">
                        <CustomImage file={file} />
                      </li>
                    ))}
                  </ul>
                </div>
              );
            else {
              return (
                <div
                  key={service.id}
                  className="flex gap-2 mx-auto justify-center items-center max-w-xl"
                >
                  <Alert
                    icon={
                      <HiMiniExclamationCircle
                        size={23}
                        className="text-[#c92e5f]"
                      />
                    }
                    className="dark:text-gray-100 rounded-md border-l-4 border-[#c92e5f] bg-[#c92e5f]/10 font-bold mb-10 text-[#c92e5f] items-center"
                  >
                    Aún no has subido imagenes para el servicio{" "}
                    <span className="uppercase">{service.nombre}</span>
                  </Alert>
                </div>
              );
            }
          })
        ) : (
          <div className="flex gap-2 mx-auto justify-center items-center">
            <HiOutlineExclamationCircle
              size={23}
              className="text-blue-gray-800"
            />
            <p>Para continuar, debes seleccionar servicios!</p>
          </div>
        )}
        <p className="dark:text-gray-100 dark:font-normal text-lg font-bold text-blue-gray-800 flex justify-center items-center gap-4">
          Médico asignado <HiShieldCheck size={25} className="text-green-800" />
        </p>
        <div className="md:w-1/2 relative mx-auto">
          <img
            src={clienteSeleccionado?.fk_usuario.profile_img}
            alt={clienteSeleccionado?.profesion}
            className="rounded-full w-60 mx-auto md:w-64 shadow-lg"
          />
          <VerticalTable clienteSeleccionado={clienteSeleccionado} />
        </div>
      </div>
    </>
  );
};
