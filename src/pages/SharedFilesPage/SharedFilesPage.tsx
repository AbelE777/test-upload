// @material-tailwind-react
import {
  Card,
  Avatar,
  Button,
  CardBody,
  Typography
} from "@material-tailwind/react";
import emptyData from "../../assets/svg/undraw_no_data_re_kwbl.svg";
import { IoCalendarClearOutline } from "react-icons/io5";

import { CustomSpinner, ModalPdf, Title } from "../../components";
import { ChangeEvent, useEffect, useState } from "react";
import { getGroupFiles } from "../../api";
import { motion } from "framer-motion";
import { GroupFilesInterface } from "../../types";
import classNames from "classnames";
import { inputClasses, inputLabelClasses } from "../Login/inputClases";
import moment from "moment";

export interface FilesFormInterface {
  filesGroupName: string;
}

function SharedFilesPage() {
  const [filteredGroups, setFilteredGroups] = useState<GroupFilesInterface[]>([])
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [groups, setGroups] = useState<GroupFilesInterface[]>([]);
  const [groupeSelected, setGroupeSelected] = useState<GroupFilesInterface>();

  useEffect(() => {
    const getGroups = async () => {
      try {
        const response = await getGroupFiles();
        setGroups(response.data);
        setFilteredGroups(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
      // console.log(filesToUpload[0].files)
    };

    getGroups();
  }, []);

  const handleShowModalPdfPreview = (group: GroupFilesInterface) => {
    setOpen(true);
    setGroupeSelected(group);
  };

  const handleFilterGroups = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if(val) {
      const filteredGroup = groups.filter(group => {
        return group.group_name.toLowerCase().includes(val)
      })
      setFilteredGroups(filteredGroup)
    } else {
      setFilteredGroups(groups)
    }
  };

  const inputClassDynamic = [
    ...inputClasses,
    "dark:border-slate-600",
    "focus:border-blue-300",
    "dark:focus:border-blue-300",
  ];
  const labelClassDynamic = [
    ...inputLabelClasses,
    "peer-focus:text-blue-300",
  ];

  const getDate = (fecha: string) => {
    return String(moment(fecha).format('YYYY-MM-DD'))
  }

  return (
    <>
      {isLoading && (
        <CustomSpinner loadingMessage={`Trayendo tus archivos...`} />
      )}
      <Title size="large" color="gray-800" position="left">
        COMPARTIDOS
      </Title>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        className="flex items-center justify-center pb-5 flex-col"
      >
        <div className="m-5 max-w-[45rem] mx-auto">
          <span className="dark:text-gray-200 text-gray-800 text-xl font-semibold block text-center">
            Aquí puedes ver los grupos de archivos compartidos
          </span>
        </div>
        {groups.length > 0 && (
          <div className="relative w-full sm:w-1/2 my-3">
            <input
              className={classNames(inputClassDynamic)}
              name="filter"
              placeholder="Filtra por creador o nombre de grupo"
              onChange={handleFilterGroups}
            />
            {/* <label htmlFor='filter' className={classNames(labelClassDynamic)}>
            Filtra por creador o nombre de grupo
            </label> */}
          </div>
        )}
        {groups.length > 0 && (
          <div className="relative w-full sm:w-1/2 my-3">
            <p>Tienes <strong>{groups.length}</strong> grupos compartidos</p>
          </div>
        )}
        <section className="mx-auto max-w-[70rem] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {(filteredGroups.length > 0) &&
            filteredGroups.map((group: GroupFilesInterface, id: number) => (
              <Card
                key={id}
                className="overflow-hidden border border-gray-300 dark:border-gray-800 shadow-sm dark:bg-black"
              >
                <CardBody className="p-5">
                  <Typography
                    color="blue-gray"
                    className="mb-1 !text-base !font-semibold text-gray-900 dark:text-gray-200"
                  >
                    {group.group_name}
                  </Typography>
                  <div className="my-4 mx-5 flex-col flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <Avatar
                        src={group.user_id.profile_img}
                        alt="Nombre creador"
                      />
                      <div>
                        <Typography
                          color="gray"
                          variant="small"
                          className="font-medium dark:text-white"
                        >
                          Creado por
                        </Typography>
                        <Typography
                          variant="h6"
                          className="text-gray-900 dark:text-white"
                        >
                          {group.user_id.usuario}
                        </Typography>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="outlined"
                      className="text-gray-900 border-gray-300 dark:border-gray-700 dark:text-gray-200"
                      onClick={() => handleShowModalPdfPreview(group)}
                    >
                      Ver {group.files.length} archivos
                    </Button>
                  </div>
                  <div className="flex justify-center items-center gap-1">
                    {getDate(group.createdAt)} <IoCalendarClearOutline />
                  </div>
                </CardBody>
              </Card>
            )).reverse()}
        </section>
        {groups.length === 0 && (
          <div className="flex">
            <div className="mb-12 md:mb-0 md:w-8/12 lg:w-5/12 mx-auto">
              <img src={emptyData} className="w-full" alt="Phone image" />
              <p className="font-semibold text-lg pt-3 dark:text-gray-100 text-gray-800">
                No hay nada publicado aún
              </p>
            </div>
          </div>
        )}
      </motion.div>

      {open && groupeSelected && (
        <ModalPdf open={open} setOpen={setOpen} group={groupeSelected} />
      )}
    </>
  );
}

export default SharedFilesPage;
