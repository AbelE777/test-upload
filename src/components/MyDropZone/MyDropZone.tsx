import { useCallback, useState } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import { HiXMark, HiOutlineArrowUpTray } from "react-icons/hi2";

interface FileWithPreview extends File {
  preview: string;
}

const MyDropZone = ({ className }: { className: string }) => {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [rejected, setRejected] = useState<FileRejection[]>([]);

  const onDrop = useCallback(
    (acceptedFiles: Array<File>, rejectedFiles: Array<FileRejection>) => {
      if (acceptedFiles?.length) {
        setFiles((previusFiles) => [
          ...previusFiles,
          ...acceptedFiles.map((file) =>
            Object.assign(file, { preview: URL.createObjectURL(file) })
          ),
        ]);
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

  const removeFile = (name: string) => {
    setFiles((files) => files.filter((file) => file.name !== name));
  };

  const removeRejected = (name: string) => {
    setRejected((files) => files.filter(({ file }) => file.name !== name));
  };

  return (
    <div>
      <div {...getRootProps({ className })}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <>
            <p className="text-lg mb-4">Suelta tus imágenes aquí ...</p>
            <HiOutlineArrowUpTray size={25} className="text-blue-500 mx-auto"/>
          </>
        ) : (
          <>
            <p className="text-lg mb-4">Arrastra y suelta tus imágenes aquí, o click para seleccionar</p>
            <HiOutlineArrowUpTray size={25} className="text-blue-500 mx-auto"/>
          </>
        )}
      </div>

      {/* accepted files */}
      <h3 className="title text-lg font-semibold text-neutral-600 mt-10">
        Archivos aceptados
      </h3>
      <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-10">
        {files.map((file) => (
          <li key={file.name} className="relative h-32 rounded-md shadow-lg">
            <img
              onLoad={() => {
                URL.revokeObjectURL(file.preview);
              }}
              src={file.preview}
              alt=""
              width={100}
              height={100}
              className="h-full w-full object-contain rounded-md"
            />
            <button
              type="button"
              className="w-7 h-7 border border-secondary-400 bg-red-400 rounded-full flex justify-center items-center absolute -top-3 -right-3 hover:bg-gray-400 transition-colors"
              onClick={() => removeFile(file.name)}
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
      <h3 className="title text-lg font-semibold text-neutral-600 mt-24 border-b pb-3">
        Archivos rechazados
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
  );
};

export default MyDropZone;
