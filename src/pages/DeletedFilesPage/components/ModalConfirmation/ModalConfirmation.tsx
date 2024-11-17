import {
  Button,
  Dialog,
  DialogBody,
  DialogHeader,
} from "@material-tailwind/react";
import { GroupFilesInterface } from "../../../../types";

interface Props {
  open: boolean;
  setOpen: (val: boolean) => void;
  group: GroupFilesInterface;
  handleAction: (val: boolean) => void
}

const ModalConfirmation = ({ group, open, setOpen, handleAction }: Props) => {
  return (
    <Dialog
      open={open}
      handler={() => setOpen(!open)}
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.9, y: -100 },
      }}
      className="dark:bg-gray-900"
      size="xs"
    >
      <DialogHeader className="dark:text-gray-300 text-gray-800 font-normal flex justify-center flex-col gap-2">
        <p className="text-3xl">Restaurar grupo</p>
      </DialogHeader>
      <DialogBody className="pt-0 px-14">
        <h1 className="text-gray-800 dark:text-white font-medium text-xl text-center">
          ¿Estás segur@ de restaurar el grupo {group.group_name}?
        </h1>
        <div className="flex gap-2 justify-center mt-4">
          <Button
            size="sm"
            variant="outlined"
            className="border-none dark:bg-black font-normal dark:text-white"
            onClick={() => handleAction(false)}
          >
            No, cancelar
          </Button>
          <Button
            size="sm"
            variant="filled"
            color="blue"
            className="borner-none font-normal"
            onClick={() => handleAction(true)}
          >
            Si, restaurar
          </Button>
        </div>
      </DialogBody>
    </Dialog>
  );
};

export default ModalConfirmation;
