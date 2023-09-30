/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  HiOutlinePhone,
  HiOutlineMapPin,
  HiOutlineCalendarDays,
  HiOutlineUsers,
  HiOutlineUserPlus,
} from "react-icons/hi2";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { IModalData } from "../../types";
import moment from "moment";

interface Props {
  modalConfig: { open: boolean; data: IModalData };
  setModalConfig: ({ open, data }: { open: boolean; data: IModalData }) => void;
}

export default function Modal({ modalConfig, setModalConfig }: Props) {
  const handleOpen = () =>
    setModalConfig({
      open: !modalConfig.open,
      data: {
        direccion: "",
        fecha_nacimiento: null,
        createdAt: null,
        genero: "",
        profile_img: "",
        telefono: "",
        nombres: "",
      },
    });
  const {
    nombres,
    profile_img,
    direccion,
    fecha_nacimiento,
    genero,
    telefono,
    createdAt,
  } = modalConfig.data;
  return (
    <>
      <Dialog
        open={modalConfig.open}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
        className="dark:bg-gray-900"
      >
        <DialogHeader className="dark:text-gray-300 text-gray-800 font-normal">
          Detalles {nombres}
        </DialogHeader>
        <DialogBody divider>
          <div className="md:flex">
            <div className="md:w-1/2">
              <img src={profile_img} alt={nombres} className="shadow-lg rounded-full w-60 mx-auto md:w-64" />
            </div>
            <div className="md:w-1/2 flex items-center overflow-auto overflow-y-hidden">
              <table className="w-full text-lg">
                <tbody className="dark:text-gray-200 text-gray-700 font-medium justify-between">
                  <tr>
                    <td className="flex items-center gap-2">
                      <HiOutlineMapPin
                        className="text-blue-700 flex"
                        strokeWidth={2}
                      />
                      Dirección:
                    </td>
                    <td className="text-right">{direccion}</td>
                  </tr>
                  <tr>
                    <td className="flex items-center gap-2">
                      <HiOutlineCalendarDays
                        className="text-blue-700"
                        strokeWidth={2}
                      />{" "}
                      F. Nacimiento:
                    </td>
                    <td className="text-right">
                      {moment(fecha_nacimiento).format("MMM Do YY")}
                    </td>
                  </tr>
                  <tr>
                    <td className="flex items-center gap-2">
                      <HiOutlineUsers
                        className="text-blue-700"
                        strokeWidth={2}
                      />
                      Género:{" "}
                    </td>
                    <td className="text-right">{genero}</td>
                  </tr>
                  <tr>
                    <td className="flex items-center gap-2">
                      <HiOutlinePhone
                        className="text-blue-700"
                        strokeWidth={2}
                      />
                      Teléfono:{" "}
                    </td>
                    <td className="text-right">{telefono}</td>
                  </tr>
                  <tr>
                    <td className="flex items-center gap-2">
                      <HiOutlineUserPlus
                        className="text-blue-700"
                        strokeWidth={2}
                      />{" "}
                      Creado el:
                    </td>
                    <td className="text-right">
                      {moment(createdAt).format("MMM Do YY HH:mm")}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button variant="gradient" color="green" onClick={handleOpen}>
            <span>OK</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
