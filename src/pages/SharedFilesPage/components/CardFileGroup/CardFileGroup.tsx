import {
  Button,
  Card,
  CardBody,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import { FaRegFilePdf } from "react-icons/fa6";
import { IoImageOutline } from "react-icons/io5";
import { HiOutlineEye } from "react-icons/hi2";
import {
  getDateMediumFormat,
  isImageExtension,
  isPdfExtension,
} from "../../../../utils";
import { useState } from "react";
import { downloadFile, getFileUrl } from "../../../../api";
import { toast } from "sonner";
import { TbCheck } from "react-icons/tb";
import { IoCalendarClearOutline } from "react-icons/io5";
import { FileInterface } from "../../../../types";

interface Props {
  file: FileInterface;
  showCreatedAt?: boolean;
  highlightenText?: (s: string) => string | (string | JSX.Element)[]
}

const iconClass = "text-white dark:text-white";

function CardFileGroup({ file, showCreatedAt = false, highlightenText }: Props) {
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

      window.open(blobUrl, "_blank");

      // Limpiar la URL cuando ya no sea necesaria (opcional)
      // URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Card className="overflow-hidden border border-gray-300 dark:border-gray-800 shadow-sm dark:bg-black">
      <CardBody className="p-4 flex flex-col items-center">
        <Typography
          color="blue-gray"
          className="mb-2 !text-base !font-normal text-gray-800 dark:text-white"
        >
          {highlightenText ? highlightenText(file.original_file_name) : file.original_file_name}
        </Typography>
        <div className="flex gap-1 items-center">
          <Button
            className="flex gap-1 font-normal text-sm bg-indigo-500 dark:bg-blue-gray-800"
            variant="filled"
            onClick={() => handleDownloadFile(file.id_file, file.file_name)}
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
                <FaRegFilePdf className={iconClass} size={18} strokeWidth={1} />
              )}
            {downloading[1] === file.id_file && downloading[0] && (
              <TbCheck className={iconClass} size={18} strokeWidth={3} />
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
        {showCreatedAt && (
          <div className="flex justify-center items-center gap-1 font-normal text-gray-800 dark:text-gray-200 mt-2">
            {getDateMediumFormat(file.createdAt)} <IoCalendarClearOutline />
          </div>
        )}
      </CardBody>
    </Card>
  );
}

export default CardFileGroup;
