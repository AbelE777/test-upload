import {
  Accordion,
  AccordionHeader,
  AccordionBody,
  Radio,
  Tooltip,
} from "@material-tailwind/react";
import {
  HiOutlineExclamationCircle,
  HiChevronDown,
  HiCheckCircle,
  HiMiniExclamationCircle,
  HiCurrencyDollar,
} from "react-icons/hi2";
import { FaHandHoldingDollar } from "react-icons/fa6";
import { MyDropZone } from "../../../components";
import { motion } from "framer-motion";
import { PiToothDuotone } from "react-icons/pi";
import React from "react";

type ServicesType = {
  id: string;
  nombre: string;
  precios: number[];
  precioSeleccionado?: number | null;
  remision: number;
  files?: FileWithPreview[];
  piezas?: number[];
  tipo_piezas?: string;
};
interface FileWithPreview extends File {
  preview: string;
}
interface ContentStep3Type {
  activeStep: number;
  selectedServices: ServicesType[];
  setSelectedServices: React.Dispatch<React.SetStateAction<ServicesType[]>>;
  openAccordion: number;
  handleOpenAccordion: (value: number) => void;
  addFilesToSelectedServices: (
    serviceId: string,
    acceptedFiles: FileWithPreview[]
  ) => void;
  removeFileFromSelectedServices: (
    serviceId: string,
    fileToRemove: File
  ) => void;
}

const ContentStep3 = ({
  activeStep,
  selectedServices,
  openAccordion,
  handleOpenAccordion,
  setSelectedServices,
  addFilesToSelectedServices,
  removeFileFromSelectedServices,
}: ContentStep3Type) => {
  const handleSetPrecio = (
    e: React.ChangeEvent<HTMLInputElement>,
    serviceid: string
  ) => {
    const { value } = e.target;

    const copiaSelectedServices = [...selectedServices];

    copiaSelectedServices.forEach((service) => {
      if (service.id === serviceid) {
        service.precioSeleccionado = Number(value);
      }
    });

    setSelectedServices(copiaSelectedServices);
  };

  return (
    <div className={`mt-10 ${activeStep === 3 ? "block" : "hidden"}`}>
      {/* <button onClick={() => console.log(selectedServices)}>ver</button> */}
      {selectedServices.length ? (
        selectedServices.map((service, idx) => (
          <Accordion
            key={service.id}
            open={openAccordion === idx + 1}
            className="mb-2 rounded-lg border border-blue-gray-100 px-4"
            icon={
              <HiChevronDown
                size={22}
                className={`mx-auto transition-transform dark:text-gray-400 ${
                  openAccordion === idx + 1 ? "rotate-180" : ""
                }`}
              />
            }
          >
            <AccordionHeader
              onClick={() => handleOpenAccordion(idx + 1)}
              className={`border-b-0 transition-colors font-normal ${
                openAccordion === idx + 1
                  ? "text-blue-500 hover:!text-blue-700"
                  : ""
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <div className="w-full">
                  <div className="flex gap-2 dark:text-gray-100">
                    {service.nombre}
                    {service.piezas?.length ? (
                      <motion.strong
                        className="font-normal"
                        transition={{ duration: 0.3, delay: 0.2 }}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                      >
                        <span className="flex items-center">
                          <PiToothDuotone size={23} />{" "}
                          {service.piezas.join(", ")}
                        </span>
                      </motion.strong>
                    ) : null}
                  </div>
                </div>
                {(service.files?.length && service.precioSeleccionado) ? (
                  <HiCheckCircle className="text-green-400" size={30} />
                ) : (
                  <HiMiniExclamationCircle
                    className="text-yellow-800"
                    size={30}
                  />
                )}
              </div>
            </AccordionHeader>
            <AccordionBody className="pt-0 text-base font-normal">
              <div className="flex justify-center gap-4 mt-2 mb-5">
                <div className="block md:flex items-center justify-center w-full md:w-1/2 gap-1 md:gap-10">
                  <div className="text-gray-500 text-lg cursor-pointer flex justify-center">
                    {service.precios.map((precio) => (
                      <Radio
                        // defaultChecked={service.precios.length === 1}
                        defaultChecked={false}
                        key={precio}
                        crossOrigin=""
                        name={service.nombre.toString()}
                        onChange={(e) => handleSetPrecio(e, service.id)}
                        value={precio}
                        label={precio.toString()}
                        icon={
                          <HiCurrencyDollar
                            className="text-green-500 cursor-pointer"
                            size={26}
                          />
                        }
                      />
                    ))}
                  </div>
                  <Tooltip content="Valor de remisión" placement="right">
                    <div className="flex items-center justify-center gap-1 cursor-pointer">
                      <FaHandHoldingDollar className="text-blue-500" size={26} />{" "}
                      <span className="text-blue-500 text-lg">
                        $ {service.remision}
                      </span>
                    </div>
                  </Tooltip>
                </div>
              </div>
              <div className="md:w-3/4 flex justify-center items-center mx-0 md:mx-auto">
                <MyDropZone
                  serviceId={service.id}
                  serviceName={`${service.nombre} ${
                    service.tipo_piezas ? `${service.tipo_piezas}` : ""
                  }`}
                  className="p-16 border-2 rounded-xl border-neutral-400"
                  addFilesToSelectedServices={addFilesToSelectedServices}
                  removeFileFromSelectedServices={
                    removeFileFromSelectedServices
                  }
                  files={service.files || []}
                />
              </div>
            </AccordionBody>
          </Accordion>
        ))
      ) : (
        <div className="flex gap-2 mx-auto justify-center items-center">
          <HiOutlineExclamationCircle
            size={23}
            className="text-blue-gray-800"
          />
          <p>Aún no has seleccionado servicios</p>
        </div>
      )}
    </div>
  );
};

export default ContentStep3;
