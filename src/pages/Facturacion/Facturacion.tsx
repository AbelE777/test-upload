import { Button, Stepper, Step, Typography } from "@material-tailwind/react";
import {
  ModalFacturacion,
  Title,
  DataReadOnly,
  AnimatedButton,
} from "../../components";
import React, { FormEvent, useEffect, useState } from "react";
import { useLogout, useVerifyRol } from "../../hooks";
import { getClientes } from "../../api";
import { IClientData } from "../../types";
import { PiChecks } from "react-icons/pi";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import {
  HiOutlineRectangleStack,
  HiOutlineUser,
  HiOutlineClipboardDocument,
  HiOutlineTrash,
  HiChevronLeft,
  HiChevronRight,
  HiOutlinePhoto,
  HiMiniDevicePhoneMobile,
  HiMiniAtSymbol,
  HiArrowUpTray,
  HiOutlineIdentification,
} from "react-icons/hi2";
import { FaUserDoctor } from "react-icons/fa6";
import { Toaster, toast } from "sonner";
import {
  ModalPiezas,
  ContentStep3,
  ContentStep2,
  ContentStep4,
  ClienteData,
} from "./components";
import { FileWithPreview, PacienteType, ServicesType } from "./types";
import { ConfirmModal } from "../../components";

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
  const verifyRolAndRedirect = useVerifyRol();
  useEffect(() => {
    verifyRolAndRedirect();
  }, []);

  const darkClass = "dark:text-gray-100";
  const logout = useLogout();
  const [clientes, setClientes] = useState<IClientData[]>([]);
  const [clienteSeleccionado, setClienteSeleccionado] = useState<IClientData>();
  const [open, setOpen] = useState(false);
  const [openModalPiezas, setOpenModalPiezas] = useState(false);
  // modal piezas periapical plus
  const [openModalPiezasPP, setOpenModalPiezasPP] = useState(false);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const closeCM = () => setOpenConfirmModal(false);
  const openCM = () => setOpenConfirmModal(true);

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
    } else if (activeStep === 3 && missingImageOrPrice().includes(true)) {
      // if (!isLastStep) setActiveStep((cur) => cur + 1);
      errMensaje = "Por favor, Selecciona precio e imagenes";
    }
    if (errMensaje) {
      toast.error(errMensaje);
    }
    if (!isLastStep && !errMensaje) {
      setActiveStep((cur) => cur + 1);
    }
  };
  const handleConfirmModal = () => {
    const data = {
      clienteSeleccionado,
      selectedServices,
      paciente
    }
    console.log(data)
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

  function missingImageOrPrice() {
    const x = selectedServices.map((service) => {
      if (!service.precioSeleccionado || !service.files) return true;
      return false;
    });
    return x;
  }

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setPaciente((prevPaciente) => ({
      ...prevPaciente,
      [name]: value,
    }));
  };
  const nombres = clienteSeleccionado?.fk_usuario.fk_persona.nombres;
  const apellidos = clienteSeleccionado?.fk_usuario.fk_persona.apellidos;
  const email = clienteSeleccionado?.fk_usuario.fk_persona.email;
  const telefono = clienteSeleccionado?.fk_usuario.fk_persona.telefono;
  const nombresApellidos = `${nombres} ${apellidos}`;
  const dataCliente = [
    {
      label: "Nombres",
      value: nombresApellidos,
      icon: HiOutlineUser,
    },
    {
      label: "Correo",
      value: email,
      icon: HiMiniAtSymbol,
    },
    {
      label: "Teléfono",
      value: telefono,
      icon: HiMiniDevicePhoneMobile,
    },
  ];
  const dataPaciente = [
    {
      label: "Nombres",
      value: paciente.nombre,
      icon: HiOutlineUser,
    },
    {
      label: "Cedula",
      value: paciente.cedula,
      icon: HiOutlineIdentification,
    },
    {
      label: "Teléfono",
      value: paciente.telefono,
      icon: HiMiniDevicePhoneMobile,
    },
    {
      label: "Cerreo",
      value: paciente.correo,
      icon: HiMiniAtSymbol,
    },
  ];

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
          className="content-center mx-auto max-w-[900px]"
          lineClassName="bg-indigo-100"
          activeLineClassName="bg-indigo-500"
        >
          <Step className="!bg-indigo-700 z-0">
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
            className={`z-0 ${
              activeStep <= 0 ? "!bg-indigo-200" : "!bg-indigo-700"
            }`}
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
            className={`z-0 ${
              activeStep <= 1 ? "!bg-indigo-200" : "!bg-indigo-700"
            }`}
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
            className={`z-0 ${
              activeStep <= 2 ? "!bg-indigo-200" : "!bg-indigo-700"
            }`}
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
            className={`z-0 ${
              activeStep === 4 ? "!bg-indigo-700" : "!bg-indigo-200"
            }`}
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

        {/* PASO 1 */}
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
                <DataReadOnly info={dataCliente} />
              </div>
            </div>
          )}
        </section>

        {/* PASO 2 */}
        <section
          className={`md:w-3/5 md:mx-auto mt-16 mb-10 px-4 ${
            activeStep === 1 ? "block" : "hidden"
          }`}
        >
          <ClienteData paciente={paciente} onInputChange={onInputChange} />
        </section>

        {/* PASO 3 */}
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
          dataCliente={dataCliente}
          dataPaciente={dataPaciente}
        />

        {/* PREV NEXT BUTTONS */}
        <div className="mt-15 mb-5 flex justify-between">
          <AnimatedButton>
            <Button
              onClick={handlePrev}
              disabled={isFirstStep}
              variant="text"
              size="sm"
              className="font-normal rounded-full flex items-center gap-3 dark:border dark:text-gray-300 dark:font-medium"
            >
              <HiChevronLeft className="text-blue-gray-900 dark:text-white" size={14} />{" "}
              Anterior
            </Button>
          </AnimatedButton>

          <AnimatedButton>
            <Button
              onClick={
                isLastStep ? (openConfirmModal ? closeCM : openCM) : handleNext
              }
              variant="text"
              size="sm"
              className={`font-normal rounded-full flex items-center gap-3 dark:border dark:text-gray-300 dark:font-medium ${
                isLastStep && "font-medium border border-gray-500"
              }`}
            >
              {isLastStep ? "Enviar" : "Siguiente"}
              {isLastStep ? (
                <HiArrowUpTray className="text-blue-gray-900 dark:text-white" size={14} />
              ) : (
                <HiChevronRight className="text-blue-gray-900 dark:text-white" size={14} />
              )}
            </Button>
          </AnimatedButton>
        </div>
      </div>
      <AnimatePresence mode="wait" onExitComplete={() => null} initial={false}>
        {openConfirmModal && (
          <ConfirmModal handleClose={closeCM}>
            <div className="flex flex-col mx-auto my-8 dark:text-white">
              <p className="font-medium text-xl">Por favor, asegúrate de revisar toda la información antes de enviar.</p>
              <p>¿Estás seguro de enviar el formulario?</p>
            </div>
            <div className="flex gap-3 mt-auto">
              <AnimatedButton>
                <Button
                  onClick={closeCM}
                  variant="text"
                  size="sm"
                  className="font-normal rounded-full flex items-center gap-3 border border-gray-500 dark:text-white dark:bg-black dark:font-medium"
                >
                  <HiChevronLeft className="text-blue-gray-900 dark:text-white" size={14} />{" "}
                  Volver
                </Button>
              </AnimatedButton>
              <AnimatedButton>
                <Button
                  onClick={handleConfirmModal}
                  variant="text"
                  size="sm"
                  className="font-normal rounded-full flex items-center gap-3 border border-gray-500 dark:text-white dark:bg-green-900 dark:border-none"
                >
                  Confirmar{" "}
                  <HiArrowUpTray className="text-blue-gray-900 dark:text-white" size={14} />
                </Button>
              </AnimatedButton>
            </div>
          </ConfirmModal>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Facturacion;
