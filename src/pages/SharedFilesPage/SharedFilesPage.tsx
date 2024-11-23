// @material-tailwind-react
import {
  Card,
  Avatar,
  Button,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import emptyData from "../../assets/svg/undraw_no_data_re_kwbl.svg";
import { IoCalendarClearOutline } from "react-icons/io5";

import { CustomSpinner, Title } from "../../components";
import { ChangeEvent, useEffect, useState } from "react";
import { deleteOrRestoreFileGroup, getGroupFiles, validateToken } from "../../api";
import { motion } from "framer-motion";
import { FileInterface, GroupFilesInterface } from "../../types";
import classNames from "classnames";
import { inputClasses } from "../Login/inputClases";
import ModalPdfSharedFiles from "./components/ModalPdfSharedFiles/ModalPdfSharedFiles";
import { getDateShortFormat } from "../../utils";
import ViewToggleButton from "./components/ViewToggleButton/ViewToggleButton";
import CardFileGroup from "./components/CardFileGroup/CardFileGroup";
import { useLogout } from "../../hooks";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { currentUserSelector } from "../../recoil/selectors";
import ModalConfirmation from "./components/ModalConfirmation/ModalConfirmation";

export interface FilesFormInterface {
  filesGroupName: string;
}

function SharedFilesPage() {
  const { isAdmin } = useRecoilValue(currentUserSelector);
  const [showModalConfirmationDelete, setShowModalConfirmationDelete] =
    useState(false);
  const logout = useLogout();
  const navigate = useNavigate();
  const [filter, setFilter] = useState("");
  const [isDetailsViewEnabled, setIsDetailsViewEnabled] = useState(false);
  const [filteredGroups, setFilteredGroups] = useState<GroupFilesInterface[]>(
    []
  );
  const [groups, setGroups] = useState<GroupFilesInterface[]>([]);
  const [detailedGroups, setDetailedGroups] = useState<FileInterface[]>([]);
  const [filteredDetailedGroups, setFilteredDetailedGroups] = useState<
    FileInterface[]
  >([]);
  const [groupeSelected, setGroupeSelected] = useState<GroupFilesInterface>();
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsDetailsViewEnabled(e.target.checked);
  };

  useEffect(() => {
    const verifySession = async () => {
      const isValidToken = await validateToken();
      if (!isValidToken) {
        logout();
        navigate("/login");
        toast.message("Por favor, inicia sesión para acceder");
      }
    };
    verifySession();
  }, []);

  const getGroups = async () => {
    try {
      const response = await getGroupFiles();
      setGroups(response.data);
      setFilteredGroups(response.data);

      const allFiles = response.data.map((group: GroupFilesInterface) => {
        const file = group.files.map((_file) => {
          return _file;
        });
        return file;
      }) as FileInterface[];
      setDetailedGroups(allFiles.flat());
      setFilteredDetailedGroups(allFiles.flat());
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
    // console.log(filesToUpload[0].files)
  };
  useEffect(() => {
    getGroups();
  }, []);

  // const handleDeleteGroupAction = (groupId: any) => {
  //   console.log(groupId);
  // };

  const handleActionDelete = (action: boolean) => {
    if (action && groupeSelected) {
      deleteOrRestoreFileGroup(groupeSelected?.id, 0).then(() => {
        getGroups()
      }).catch(err => {
        console.log(err)
      })
    }
    setShowModalConfirmationDelete(false);
  };

  const showModalDelete = (group: any) => {
    setGroupeSelected(group);
    setShowModalConfirmationDelete(true);
  };

  const handleShowModalPdfPreview = (group: GroupFilesInterface) => {
    setGroupeSelected(group);
    setOpen(true);
  };

  const handleFilterGroups = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.toLowerCase();
    setFilter(val);
    if (val) {
      if (!isDetailsViewEnabled) {
        // si esta habilitada la vista grupo
        const filteredGroup_ = groups.filter((group) => {
          const includedInName = group.files.filter((file) =>
            file.original_file_name.includes(val)
          );
          // filtro por nombre de grupo, nombre de usuario o nombre de archivo
          return (
            group.group_name.toLowerCase().includes(val) ||
            group.user_id.usuario.toLowerCase().includes(val) ||
            includedInName.length > 0
          );
        });
        setFilteredGroups(filteredGroup_);
      }

      if (isDetailsViewEnabled) {
        // si esta habilitada la vista detalle
        const filteredDetailGroups_ = detailedGroups.filter((detailGroup) => {
          return detailGroup.original_file_name.toLowerCase().includes(val);
        });
        setFilteredDetailedGroups(filteredDetailGroups_);
      }
    } else {
      setFilteredGroups(groups);
      setFilteredDetailedGroups(detailedGroups);
    }
  };

  // Función para resaltar el texto de coincidencia
  const getHighlightedText = (text: string) => {
    if (!filter) return text;

    const regex = new RegExp(`(${filter})`, "gi");
    const parts = text.split(regex);
    return parts.map((part, index) =>
      regex.test(part) ? (
        <span
          key={index}
          className="bg-blue-800 text-white dark:text-black dark:bg-cyan-400 rounded-md px-1"
        >
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  const inputClassDynamic = [
    ...inputClasses,
    "dark:border-slate-600",
    "focus:border-blue-300",
    "dark:focus:border-blue-300",
  ];
  // const labelClassDynamic = [...inputLabelClasses, "peer-focus:text-blue-300"];

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
        {/* INPUT FILTER */}
        {groups.length > 0 && (
          <div className="relative w-full sm:w-1/2 my-3">
            <input
              className={classNames(inputClassDynamic)}
              name="filter"
              placeholder="Filtra por creador, nombre de grupo o de archivo"
              onChange={handleFilterGroups}
              autoFocus={true}
              value={filter}
            />
            {/* <label htmlFor='filter' className={classNames(labelClassDynamic)}>
            Filtra por creador o nombre de grupo
            </label> */}
          </div>
        )}

        {groups.length > 0 && (
          <div className="relative px-3 md:px-0 lg:px-0 w-full sm:w-1/2 my-3 dark:text-gray-200 flex justify-between items-center">
            <p>
              Tienes{" "}
              {isDetailsViewEnabled ? (
                <>
                  <strong>{detailedGroups.length}</strong> imagenes compartidas
                </>
              ) : (
                <>
                  <strong>{groups.length}</strong> grupos compartidos
                </>
              )}
            </p>
            <ViewToggleButton
              checked={isDetailsViewEnabled}
              handleChange={handleChange}
            />
          </div>
        )}
        {!isDetailsViewEnabled && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center pb-5 flex-col"
          >
            {filteredGroups.length > 0 ? (
              <section className="mx-auto max-w-[70rem] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredGroups
                  .map((group: GroupFilesInterface, id: number) => (
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
                        <div className="my-4 mx-5 flex-col flex items-center justify-between gap-4">
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
                          {isAdmin && (
                            <Button
                              size="sm"
                              variant="outlined"
                              className="text-white border-none bg-red-400 font-normal"
                              onClick={() => showModalDelete(group)}
                            >
                              Eliminar grupo
                            </Button>
                          )}
                        </div>
                        <div className="flex justify-center items-center gap-1 dark:font-normal dark:text-white">
                          {getDateShortFormat(group.createdAt)}{" "}
                          <IoCalendarClearOutline />
                        </div>
                      </CardBody>
                    </Card>
                  ))
                  .reverse()}
              </section>
            ) : (
              <Title size="large" color="gray-800" position="left">
                NO SE ENCONTRARON RESULTADOS
              </Title>
            )}
          </motion.div>
        )}
        {isDetailsViewEnabled && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center pb-5 flex-col"
          >
            {filteredDetailedGroups.length > 0 ? (
              <section className="mx-auto max-w-[70rem] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredDetailedGroups
                  .map((detailedFiles) => (
                    <CardFileGroup
                      showCreatedAt={true}
                      key={detailedFiles.file_name}
                      file={detailedFiles}
                      highlightenText={getHighlightedText}
                    />
                  ))
                  .reverse()}
              </section>
            ) : (
              <Title size="large" color="gray-800" position="left">
                NO SE ENCONTRARON RESULTADOS
              </Title>
            )}
          </motion.div>
        )}
        {groups.length === 0 && (
          <div className="flex">
            <div className="mb-12 md:mb-0 md:w-8/12 lg:w-5/12 mx-auto">
              <img src={emptyData} className="w-full" alt="no data available" />
              <p className="font-semibold text-lg pt-3 dark:text-gray-100 text-gray-800">
                No hay nada publicado aún
              </p>
            </div>
          </div>
        )}
      </motion.div>

      {open && groupeSelected && (
        <ModalPdfSharedFiles
          open={open}
          setOpen={setOpen}
          group={groupeSelected}
        />
      )}
      {showModalConfirmationDelete && groupeSelected && (
        <ModalConfirmation
          open={showModalConfirmationDelete}
          setOpen={setShowModalConfirmationDelete}
          group={groupeSelected}
          handleAction={handleActionDelete}
        />
      )}
    </>
  );
}

export default SharedFilesPage;
