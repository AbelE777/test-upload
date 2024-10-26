import { Button } from "@material-tailwind/react";
import { AnimatedButton, MyDropZone, Title } from "../../components";
import { HiOutlineArrowUpTray } from "react-icons/hi2";
import { useState } from "react";
import { FilesInterface, FileWithPreview } from "../Facturacion/types";
import { toast, Toaster } from "sonner";

function FilesPage() {
  const [filesToUpload, setFilesToUpload] = useState<FilesInterface[]>([{
    files: [],
    nombre: 'Carpeta compartida',
    id: 'files-service'
  }])

  const addFiles = (
    serviceId: string,
    acceptedFiles: FileWithPreview[]
  ) => {
    setFilesToUpload((prevServices) =>
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

  const removeFiles = (
    serviceId: string,
    fileToRemove: File
  ) => {
    setFilesToUpload((prevServices) =>
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

  const onShareFiles = () => {
    if (!filesToUpload[0].files.length) {
      return toast.error("No has seleccionado archivos aún.");
    }
    toast.success("Subiendo archivos...");
  }

  return (
    <>
      <Title size="large" color="gray-800" position="left">
        Carpeta compartida
      </Title>
      <div className="m-10">
        <AnimatedButton>
          <Button
            onClick={onShareFiles}
            variant="text"
            size="sm"
            className="font-normal rounded-full flex items-center gap-3 border border-gray-500 dark:text-white dark:bg-black dark:font-medium my-10 mx-auto"
          >
            <HiOutlineArrowUpTray
              className="text-blue-gray-900 dark:text-white"
              size={14}
            />{" "}
            Compartir
          </Button>
        </AnimatedButton>
        <MyDropZone
          serviceId={filesToUpload[0].id}
          serviceName={filesToUpload[0].nombre}
          className="p-16 border-2 rounded-xl border-neutral-400"
          addFilesToSelectedServices={addFiles}
          removeFileFromSelectedServices={removeFiles}
        />
      </div>
    </>
  );
}

export default FilesPage;
