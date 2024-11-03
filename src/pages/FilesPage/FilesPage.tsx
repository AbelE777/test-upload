import { Button } from "@material-tailwind/react";
import {
  AnimatedButton,
  CustomSpinner,
  MyDropZone,
  Title,
} from "../../components";
import { HiOutlineArrowUpTray } from "react-icons/hi2";
import { useEffect, useState } from "react";
import { FilesInterface, FileWithPreview } from "../Facturacion/types";
import { toast } from "sonner";
import { uploadFile } from "../../api";
import CustomInput from "../Login/components/CustomInputs";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";

export interface FilesFormInterface {
  filesGroupName: string;
}

const initialState = [
  {
    files: [],
    nombre: "Carpeta compartida",
    id: "files-service",
  },
]

function FilesPage() {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<FilesFormInterface>();
  const [isLoading, setIsLoading] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  const [filesToUpload, setFilesToUpload] = useState<FilesInterface[]>(initialState);

  const addFiles = (serviceId: string, acceptedFiles: FileWithPreview[]) => {
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

  const removeFiles = (serviceId: string, fileToRemove: File) => {
    console.log('aqui')
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

  const onShareFiles = async () => {
    const filesGroupName = getValues("filesGroupName");
    const total = filesToUpload[0].files.length;
    if (!total) return toast.error("No has adjuntado archivos aún.");
    if (filesGroupName.length === 0)
      return toast.error("Por favor, dale un nombre a la publicación.");

    const files = filesToUpload[0].files;

    setIsLoading(true);
    
    const formData = new FormData();
    Array.from(files).forEach((file) => {
      formData.append("files", file);
    });
    formData.append("groupName", filesGroupName.toUpperCase());

    try {
      const response = await uploadFile(formData, filesGroupName);
      if(response.status === 201 && response.data.files.length > 0 && response.data.message) {
        toast.success(response.data.message);
        setValue('filesGroupName', '')
        setIsLoading(false);
        filesToUpload[0].files.forEach((file) => {
          URL.revokeObjectURL(file.preview); // Liberar la URL generada
          removeFiles(filesToUpload[0].id, file)
        })
        setFilesToUpload(initialState)
        setResetKey((prevKey) => prevKey + 1);
      }
      
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  // useEffect(() => {
  //   console.log('aqui')
  // }, [filesToUpload]);

  return (
    <>
      {isLoading && (
        <CustomSpinner
          loadingMessage={`Subiendo ${filesToUpload[0].files.length} archivos...`}
        />
      )}
      <Title size="large" color="gray-800" position="left">
        NUEVOS ARCHIVOS
      </Title>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        className="flex items-center justify-center pb-5 flex-col"
      >
        <div className="mx-10 max-w-[45rem] mx-auto">
          <AnimatedButton>
            <Button
              onClick={onShareFiles}
              variant="text"
              size="lg"
              className="font-normal rounded-full flex items-center gap-3 border border-gray-500 dark:text-white dark:bg-black dark:font-medium my-8 mx-auto"
            >
              <HiOutlineArrowUpTray
                className="text-blue-gray-900 dark:text-white"
                size={18}
              />{" "}
              Compartir
            </Button>
          </AnimatedButton>
          <form
            onSubmit={handleSubmit(() => {})}
            className="flex flex-col gap-3"
          >
            <span className="dark:text-gray-200 text-gray-700 text-xl font-semibold block text-left">
              Dale un nombre a este grupo de archivos
            </span>
            <div className="relative mb-6">
              <CustomInput
                type="text"
                autofocus={true}
                errors={errors}
                register={register}
                name="filesGroupName"
                label="Nombre grupo de archivos *"
                rules={{ required: "Este campo es obligatorio" }}
              />
            </div>
          </form>
          <MyDropZone
            key={resetKey}
            serviceId={filesToUpload[0].id}
            serviceName={filesToUpload[0].nombre}
            className="p-16 border-2 rounded-xl border-neutral-400"
            addFilesToSelectedServices={addFiles}
            removeFileFromSelectedServices={removeFiles}
          />
        </div>
      </motion.div>
    </>
  );
}

export default FilesPage;
