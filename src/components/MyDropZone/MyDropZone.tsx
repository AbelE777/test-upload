import { useCallback, useEffect, useState } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import { HiXMark, HiOutlineArrowUpTray } from "react-icons/hi2";
import { CustomImage } from "..";
import { motion } from "framer-motion";

interface FileWithPreview extends File {
  preview: string;
}
interface Props {
  className: string;
  serviceId: string;
  serviceName: string;
  files: FileWithPreview[];
  addFilesToSelectedServices: (
    serviceId: string,
    acceptedFiles: FileWithPreview[]
  ) => void;
  removeFileFromSelectedServices: (
    serviceId: string,
    fileToRemove: File
  ) => void;
}

const MyDropZone = ({
  className,
  serviceId,
  serviceName,
  addFilesToSelectedServices,
  removeFileFromSelectedServices,
  files,
}: Props) => {
  const [localFiles, setLocalFiles] = useState<FileWithPreview[]>(files);
  const [rejected, setRejected] = useState<FileRejection[]>([]);

  const onDrop = useCallback(
    (acceptedFiles: Array<File>, rejectedFiles: Array<FileRejection>) => {
      if (acceptedFiles?.length) {
        setLocalFiles((previusFiles) => [
          ...previusFiles,
          ...acceptedFiles.map((file) =>
            Object.assign(file, { preview: URL.createObjectURL(file) })
          ),
        ]);
        const transformedFiles = acceptedFiles.map((file) =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        );
        addFilesToSelectedServices(serviceId, transformedFiles);
      }
      if (rejectedFiles?.length) {
        setRejected((previusFiles) => [...previusFiles, ...rejectedFiles]);
      }
    },
    []
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpeg"],
      "image/jpg": [".jpg"],
    },
    maxSize: 1024 * 1000, // 1mb
  });

  const removeFile = (file_: File) => {
    setLocalFiles((files) => files.filter((file) => file.name !== file_.name));
    removeFileFromSelectedServices(serviceId, file_);
  };

  const removeRejected = (name: string) => {
    setRejected((files) => files.filter(({ file }) => file.name !== name));
  };

  useEffect(() => {
    return () => {
      files.forEach((file) => {
        URL.revokeObjectURL(file.preview); // Liberar la URL generada
      });
    };
  }, [files]);

  return (
    <div className="">
      <div {...getRootProps({ className })}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <>
            <p className="text-lg mb-4 dark:text-gray-100">Suelta tus imágenes aquí ...</p>
            <HiOutlineArrowUpTray size={25} className="text-blue-500 mx-auto" />
          </>
        ) : (
          <motion.div
            whileHover={{ x: [0, -5, 5, -5, 0] }}
            transition={{ duration: 0.3 }}
            className="cursor-pointer"
          >
            <p className="uppercase dark:text-gray-100">{serviceName}</p>
            <p className="text-lg mb-4 dark:text-gray-100">
              Arrastra y suelta tus imágenes aquí, o click para seleccionar
            </p>
            <HiOutlineArrowUpTray size={25} className="text-blue-500 mx-auto" />
          </motion.div>
        )}
      </div>

      <div>
        {/* accepted files */}
        <h3 className="title text-lg font-normal text-neutral-600 mt-10 dark:text-gray-100">
          Archivos aceptados ({localFiles.length})
        </h3>
        <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-10">
          {localFiles.map((file) => (
            <li key={file.name} className="relative h-32 rounded-md shadow-lg">
              <CustomImage file={file} />
              <button
                type="button"
                className="w-7 h-7 border border-secondary-400 bg-red-400 rounded-full flex justify-center items-center absolute -top-3 md:-right-3 hover:bg-gray-400 transition-colors"
                onClick={() => removeFile(file)}
              >
                <HiXMark className="w-5 h-5 fill-white hover:fill-secondary-400 transition-colors" />
              </button>
              <p className="mt-2 text-neutral-500 text-[12px] font-medium">
                {file.name}
              </p>
            </li>
          ))}
        </ul>

        {/* Rejected Files */}
        <h3 className="title text-lg font-normal text-neutral-600 mt-24 border-b pb-3 dark:text-gray-100">
          Archivos rechazados ({rejected.length})
        </h3>
        <ul className="mt-6 flex flex-col">
          {rejected.map(({ file, errors }) => (
            <li key={file.name} className="flex items-start justify-between">
              <div>
                <p className="mt-2 text-neutral-500 text-sm font-medium">
                  {file.name}
                </p>
                <ul className="text-[12px] text-red-400">
                  {errors.map((error) => (
                    <li key={error.code}>{error.message}</li>
                  ))}
                </ul>
              </div>
              <button
                type="button"
                className="mt-1 py-1 text-[12px] uppercase tracking-wider font-bold text-neutral-500 border border-secondary-400 rounded-md px-3 hover:bg-secondary-400 hover:text-white transition-colors"
                onClick={() => removeRejected(file.name)}
              >
                remove
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MyDropZone;
