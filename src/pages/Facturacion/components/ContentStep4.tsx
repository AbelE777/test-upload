import { Alert } from "@material-tailwind/react";
import { CustomImage, DataReadOnly } from "../../../components";
import { ContentStep4Type } from "../types";
import { motion } from "framer-motion";
import {
  HiOutlineExclamationCircle,
  HiMiniExclamationCircle,
  HiShieldCheck,
  HiMiniUser,
  HiMiniCurrencyDollar,
} from "react-icons/hi2";

const ContentStep4 = ({
  activeStep,
  selectedServices,
  clienteSeleccionado,
  dataCliente,
  dataPaciente,
}: ContentStep4Type) => {
  return (
    <div className={`mt-10 ${activeStep === 4 ? "block" : "hidden"}`}>
      {selectedServices?.length > 0 ? (
        selectedServices?.map((service) => {
          if (
            service.files?.length &&
            service.files?.length > 0 &&
            service.precioSeleccionado
          )
            return (
              <div key={service.id} className="">
                <h2 className="text-lg flex items-center justify-center uppercase mb-0 dark:text-gray-100 font-semibold text-blue-gray-800">
                  {service.nombre} -{" "}
                  <HiMiniCurrencyDollar className="text-green-700 w-6 h-6" />
                  {service.precioSeleccionado}
                </h2>
                {/* <ul className="lg:justify-center mt-0 mb-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-10"> */}
                <ul className="mt-4 mb-4 block md:flex md:items-center md:justify-center gap-10">
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
                  className="dark:text-gray-100 rounded-md border-l-4 border-[#c92e5f] bg-[#c92e5f]/10 font-medium mb-10 text-[#c92e5f] items-center"
                >
                  {!service.precioSeleccionado ? (
                    <>
                      Aún no has seleccionado precio para el servicio{" "}
                      <span className="uppercase font-bold">
                        {service.nombre}
                      </span>
                    </>
                  ) : (
                    <>
                      Aún no has subido imagenes para el servicio{" "}
                      <span className="uppercase font-bold">
                        {service.nombre}
                      </span>
                    </>
                  )}
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
      <div className="mt-10 block md:flex md:items-start md:justify-center overflow-x-hidden">
        {activeStep === 4 && (
          <motion.div
            initial={{ x: "-30%" }}
            animate={{ x: "0" }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 120 }}
            className="w-full md:w-1/3"
          >
            <p className="dark:text-gray-100 dark:font-normal text-lg font-bold text-blue-gray-800 flex justify-center items-center gap-4">
              Médico asignado{" "}
              <HiShieldCheck size={25} className="text-blue-700" />
            </p>
            <div className="md:w-full relative mx-auto">
              <img
                src={clienteSeleccionado?.fk_usuario.profile_img}
                alt={clienteSeleccionado?.profesion}
                className="rounded-full w-60 mx-auto md:w-64 shadow-lg"
              />
              <DataReadOnly info={dataCliente} />
            </div>
          </motion.div>
        )}
        {activeStep === 4 && (
          <motion.div
            initial={{ x: "30%" }}
            animate={{ x: "0" }}
            exit={{ x: "-30%" }}
            transition={{ type: "spring", stiffness: 120 }}
            className="w-full md:w-1/3"
          >
            <p className="dark:text-gray-100 dark:font-normal text-lg font-bold text-blue-gray-800 flex justify-center items-center gap-4">
              Paciente <HiMiniUser size={25} className="text-blue-700" />
            </p>
            <div className="md:w-full relative mx-auto">
              <img
                src="/src/assets/img/default-avatar.jpg"
                alt="paciente"
                className="rounded-full w-60 mx-auto md:w-64 shadow-lg"
              />
              <DataReadOnly info={dataPaciente} />
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ContentStep4;
