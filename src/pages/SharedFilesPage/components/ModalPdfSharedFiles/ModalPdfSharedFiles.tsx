import { GroupFilesInterface } from "../../../../types";
import {
  Button,
  Dialog,
  DialogBody,
  DialogHeader,
  Typography,
} from "@material-tailwind/react";

import { BsDownload } from "react-icons/bs";
import { getFormattedLongDate } from "../../../../utils";
import { downloadAllFiles } from "../../../../api";

import CardFileGroup from "../CardFileGroup/CardFileGroup";

interface Props {
  open: boolean;
  setOpen: (val: boolean) => void;
  group: GroupFilesInterface;
}

const ModalPdfSharedFiles = ({ open, setOpen, group }: Props) => {
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
          {getFormattedLongDate(group.createdAt)}
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
            <CardFileGroup showCreatedAt={false} key={id} file={file} />
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

export default ModalPdfSharedFiles;
