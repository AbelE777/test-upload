import { GroupFilesInterface } from "../../types/";
import {
  Button,
  Card,
  CardBody,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import { FaRegFilePdf } from "react-icons/fa6";
import { IoImageOutline } from "react-icons/io5";
import { HiOutlineEye } from "react-icons/hi2";
import { BsDownload } from "react-icons/bs";
import {
  getFormattedDate,
  isImageExtension,
  isPdfExtension,
} from "../../utils";
import { downloadAllFiles, downloadFile, getFileUrl } from "../../api";
import { toast } from "sonner";
import { useState } from "react";
import { TbCheck } from "react-icons/tb";

interface Props {
  open: boolean;
  setOpen: (val: boolean) => void;
  group: GroupFilesInterface;
}

const iconClass = "text-white dark:text-white";

const ModalPdf = ({ open, setOpen, group }: Props) => {
  const [downloading, setDownloading] = useState([false, 0]);

  const handleDownloadFile = async (fileId: number, fileName: string) => {
    try {
      setDownloading([true, fileId]);
      const response = await downloadFile(fileId, fileName);
      toast.success("Archivo descargado");
    } catch (error: any) {
      toast.error("Error: Archivo no encontrado en el servidor");
    } finally {
      setTimeout(() => {
        setDownloading([false, 0]);
      }, 1000);
    }
  };

  const handleViewFile = async (fileId: number) => {
    try {
      const response = await getFileUrl(fileId);
      const binary = response.data;
      // Obtener el tipo MIME del archivo desde los headers
      const contentType = response.headers["content-type"];

      // Crear un Blob con el tipo MIME recibido
      const blob = new Blob([binary], { type: contentType });

      // Crear una URL temporal para el Blob
      const blobUrl = URL.createObjectURL(blob);

      // Abrir el archivo en una nueva pestaña
      window.open(blobUrl, "_blank");

      // Limpiar la URL cuando ya no sea necesaria (opcional)
      // URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDownloadAllFiles = (groupId: number, group_name: string) => {
    try {
      downloadAllFiles(groupId, group_name);
    } catch (error) {}
  };

  return (
    <Dialog
      open={open}
      handler={() => setOpen(!open)}
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.9, y: -100 },
      }}
      className="dark:bg-gray-900"
      size="lg"
    >
      <button
        style={{ marginTop: "-25px", marginRight: "-25px" }}
        onClick={() => setOpen(!open)}
        className="absolute top-4 right-4 rounded-full py-0 px-2 bg-gray-200 hover:bg-gray-300 focus:outline-none font-semibold text-gray-900"
      >
        &times; {/* Este es el símbolo de cerrar (X) */}
      </button>
      <DialogHeader className="dark:text-gray-300 text-gray-800 font-normal flex justify-center flex-col gap-2">
        <p>{group.group_name}</p>
        <Typography
          color="gray"
          variant="small"
          className="font-medium dark:text-white"
        >
          Creado por <strong>{group.user_id.usuario}</strong> el{" "}
          {getFormattedDate(group.createdAt)}
        </Typography>

        {group.files.length > 1 && (
          <div className="flex justify-center">
            <Button
              className="flex gap-3 font-normal text-sm bg-indigo-500 dark:bg-blue-gray-800"
              variant="filled"
              onClick={() => handleDownloadAllFiles(group.id, group.group_name)}
            >
              DESCARGAR TODO
              <BsDownload
                className=" dark:text-white"
                size={15}
                strokeWidth={1}
              />
            </Button>
          </div>
        )}
      </DialogHeader>
      <DialogBody>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {group.files.map((file, id) => (
            <Card
              key={id}
              className="overflow-hidden border border-gray-300 dark:border-gray-800 shadow-sm dark:bg-black"
            >
              <CardBody className="p-4 flex flex-col items-center">
                <Typography
                  color="blue-gray"
                  className="mb-2 !text-base !font-normal text-gray-800 dark:text-white"
                >
                  {file.original_file_name}
                </Typography>
                <div className="flex gap-1 items-center">
                  <Button
                    className="flex gap-1 font-normal text-sm bg-indigo-500 dark:bg-blue-gray-800"
                    variant="filled"
                    onClick={() =>
                      handleDownloadFile(file.id_file, file.file_name)
                    }
                  >
                    Descargar{" "}
                    {isImageExtension(file.original_file_name) &&
                      downloading[1] !== file.id_file && (
                        <IoImageOutline
                          className={iconClass}
                          size={20}
                          strokeWidth={2}
                        />
                      )}
                    {isPdfExtension(file.original_file_name) &&
                      downloading[1] !== file.id_file && (
                        <FaRegFilePdf
                          className={iconClass}
                          size={18}
                          strokeWidth={1}
                        />
                      )}
                    {downloading[1] === file.id_file && downloading[0] && (
                      <TbCheck
                        className={iconClass}
                        size={18}
                        strokeWidth={3}
                      />
                    )}
                  </Button>
                  <IconButton
                    variant="outlined"
                    className="dark:border-gray-800"
                    onClick={() => handleViewFile(file.id_file)}
                  >
                    <HiOutlineEye
                      className="text-gray-900 dark:text-white"
                      size={20}
                      strokeWidth={2}
                    />
                  </IconButton>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>

        <div className="md:flex"></div>
      </DialogBody>
      {/* <DialogFooter className="flex justify-center">
        <Button variant="filled" color="indigo" onClick={() => setOpen(!open)}>
          <span>CERRAR</span>
        </Button>
      </DialogFooter> */}
    </Dialog>
  );
};

export default ModalPdf;
