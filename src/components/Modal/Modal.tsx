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
  Input,
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
        size="lg"
      >
        <DialogHeader className="dark:text-gray-300 text-gray-800 font-normal">
          {nombres}
        </DialogHeader>
        <DialogBody divider>
          <div className="md:flex">
            <div className="md:w-1/2 relative">
              <div className="justify-center items-center flex h-full">
                <img
                  src={profile_img}
                  alt={nombres}
                  className="w-4/5 h-4/5 object-cover rounded-full shadow-lg"
                />
              </div>
            </div>
            <div className="md:w-1/2 flex items-center overflow-auto overflow-y-hidden">
              <div className="w-full block my-2">
                <div className="mb-2">
                  <Input
                    readOnly
                    color="blue"
                    size="lg"
                    crossOrigin="true"
                    label="Dirección"
                    icon={
                      <HiOutlineMapPin className="h-5 w-5 text-blue-gray-600" />
                    }
                    value={direccion}
                    className="cursor-not-allowed dark:text-gray-100"
                  />
                </div>
                <div className="mb-2">
                  <Input
                    readOnly
                    color="blue"
                    size="lg"
                    crossOrigin="true"
                    label="Fecha Nacimiento"
                    icon={
                      <HiOutlineCalendarDays className="h-5 w-5 text-blue-gray-600" />
                    }
                    value={moment(fecha_nacimiento).format("MMM Do YY")}
                    type="text"
                    className="cursor-not-allowed dark:text-gray-100"
                  />
                </div>
                <div className="mb-2">
                  <Input
                    readOnly
                    color="blue"
                    size="lg"
                    crossOrigin="true"
                    label="Género"
                    icon={
                      <HiOutlineUsers className="h-5 w-5 text-blue-gray-600" />
                    }
                    value={genero}
                    type="text"
                    className="cursor-not-allowed dark:text-gray-100"
                  />
                </div>
                <div className="mb-2">
                  <Input
                    readOnly
                    color="blue"
                    size="lg"
                    crossOrigin="true"
                    label="Teléfono"
                    icon={
                      <HiOutlinePhone className="h-5 w-5 text-blue-gray-600" />
                    }
                    value={telefono}
                    type="text"
                    className="cursor-not-allowed dark:text-gray-100"
                  />
                </div>
                <div className="mb-2">
                  <Input
                    readOnly
                    color="blue"
                    size="lg"
                    crossOrigin="true"
                    label="Creado el:"
                    icon={
                      <HiOutlineUserPlus className="h-5 w-5 text-blue-gray-600" />
                    }
                    value={moment(createdAt).format("MMM Do YY HH:mm")}
                    type="text"
                    className="cursor-not-allowed dark:text-gray-100"
                  />
                </div>
              </div>
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
