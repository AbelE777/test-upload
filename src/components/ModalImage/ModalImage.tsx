import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { PiTrash } from "react-icons/pi";
import {
  HiCamera,
  HiMiniCheckCircle,
  HiMiniArrowUturnLeft,
} from "react-icons/hi2";
import { ChangeEvent, useState } from "react";
import { motion } from "framer-motion";
import ModalImageButton from "../ModalImageButton";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  imgUrl: string;
  handleChooseImg?: () => void;
  fileTouched?: boolean;
  setNewImage: React.Dispatch<React.SetStateAction<string>>;
}

const ModalImage = ({ open, setOpen, imgUrl, setNewImage }: Props) => {
  const [image, setImage] = useState("");
  const [fileTouched, setFileTouched] = useState(false);

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]; // Acceder al primer archivo seleccionado

    if (selectedFile) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const result = e.target?.result as string; // Asegurar el tipo
        // Cuando se cargue la imagen, actualiza el estado
        setImage(result);
        setFileTouched(true);
      };

      // Lee el contenido del archivo como una URL de datos
      reader.readAsDataURL(selectedFile);
    }
  };
  const handleChooseImg = () =>
    document?.getElementById("profileImgInput")?.click();
  const onConfirm = () => {
    setNewImage(image);
    setOpen(false);
  };
  const onRevertImg = () => {
    const x = document?.getElementById(
      "profileImgInput"
    ) as HTMLInputElement | null;
    x!.value = "";
    setImage(imgUrl);
    setFileTouched(false);
  };
  const onDeleteImg = () => {
    setImage("/src/assets/img/default-avatar.jpg");
    setFileTouched(true);
  };

  return (
    <>
      <Dialog
        open={open}
        handler={() => setOpen(!open)}
        dismiss={{ enabled: false }}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
        className="dark:bg-gray-900"
      >
        <div className="flex items-center justify-between">
          <DialogHeader className="dark:text-gray-300 text-gray-800 font-normal">
            Imagen Perfil
          </DialogHeader>
          {/* close X icon */}
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
              src={image ? image : imgUrl}
              alt=""
              style={{ position: "relative" }}
            />
          </div>
          <input
            type="file"
            accept=".jpg, .jpeg, .png"
            id="profileImgInput"
            className="hidden"
            onChange={handleFileInputChange}
          />
        </DialogBody>
        <DialogFooter>
          {!fileTouched && (
            <ModalImageButton
              text="ELIMINAR"
              handleClick={onDeleteImg}
              icon={PiTrash}
            />
          )}
          <ModalImageButton
            text="AGREGAR"
            handleClick={handleChooseImg}
            icon={HiCamera}
          />

          {fileTouched && (
            <motion.div
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
                exit: { opacity: 0, y: 10, transition: { duration: 0.7 } },
              }}
            >
              <ModalImageButton
                text="REVERTIR"
                handleClick={onRevertImg}
                iconColor="!text-green-600"
                icon={HiMiniArrowUturnLeft}
              />
              <ModalImageButton
                text="OK"
                handleClick={onConfirm}
                iconColor="!text-green-600"
                icon={HiMiniCheckCircle}
              />
            </motion.div>
          )}
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default ModalImage;
