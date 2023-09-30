import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { PiTrash } from "react-icons/pi";
import { HiCamera, HiMiniCheckCircle } from "react-icons/hi2";
import { useState } from "react";
import { motion } from "framer-motion";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  imgUrl: string;
  handleChooseImg: () => void;
  fileTouched: boolean;
}

const ModalImage = ({
  open,
  setOpen,
  imgUrl,
  handleChooseImg,
  fileTouched,
}: Props) => {
  const [newImage, setNewImage] = useState();

  const variants =  {
    hidden: {
      x: 0,
      transition: {
        duration: 0.2,
      },
    },
    shake: {
      x: [-5, 5, -5, 5, -3, 3, -2, 2, 0],
      transition: {
        duration: 0.5,
        repeat: Infinity, // Para que la animación se repita indefinidamente
      },
    },
  };
  const chooseImg = () => {
    handleChooseImg();
  };

  return (
    <>
      <Dialog open={open} handler={() => setOpen(!open)}>
        <div className="flex items-center justify-between">
          <DialogHeader className="dark:text-gray-300 text-gray-800 font-normal">
            Imagen Perfil
          </DialogHeader>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="mr-3 h-5 w-5 cursor-pointer"
            onClick={() => setOpen(!open)}
          >
            <path
              fillRule="evenodd"
              d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <DialogBody divider>
          <div className="mx-auto max-w-xs w-60">
            <img
              id="showImage"
              className="w-64 h-60 md:w-64 md:h-60 rounded-full border-gray-300"
              src={imgUrl}
              alt=""
              style={{ position: "relative" }}
            />
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="gradient"
            color="white"
            className="text-center"
            size="sm"
          >
            <div className="flex flex-col items-center">
              <PiTrash size={30} />
              <span className="mt-2">ELIMINAR</span>
            </div>
          </Button>
          <Button
            onClick={chooseImg}
            variant="gradient"
            color="white"
            className="text-center"
            size="sm"
          >
            <div className="flex flex-col items-center">
              <HiCamera size={30} />
              <span className="mt-2">AGREGAR</span>
            </div>
          </Button>
          {fileTouched && (
            <motion.div
            animate={{ x: [0, -5, 5, -5, 0] }}
            transition={{ duration: 0.5 }}>
              <Button
                // onClick={(handleChooseImg)}
                variant="gradient"
                color="white"
                size="sm"
              >
                <div className="flex flex-col items-center">
                  <HiMiniCheckCircle size={30} className="text-green-800" />
                  <span className="mt-2">CONFIRMAR</span>
                </div>
              </Button>
            </motion.div>
          )}
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default ModalImage;
