import {
  HiChevronRight,
  HiOutlineShieldCheck,
  HiOutlineHome,
  HiChevronDown,
  HiUserCircle,
  HiMiniCog,
  HiPower,
  HiOutlineUserGroup,
} from "react-icons/hi2";
import { IAccordionOptions, ISidebarItem } from "../../types";
import { HiOutlineFolderPlus, HiOutlineFolderOpen } from "react-icons/hi2";
import { AiOutlineDelete } from "react-icons/ai";
import { GoPerson } from "react-icons/go";

export const mainMenuOptionsArr: IAccordionOptions[] = [
  {
    id: "1",
    open: 1,
    leftIcon: HiOutlineUserGroup,
    rightIcon: HiChevronDown,
    text: "Clientes",
    subOptions: [
      {
        id: "11",
        icon: HiChevronRight,
        text: "Ver Clientes",
        to: "clients",
      },
      {
        id: "12",
        icon: HiChevronRight,
        text: "Agregar Cliente",
        to: "new_client",
      },
      {
        id: "13",
        icon: HiChevronRight,
        text: "Facturación",
        to: "facturacion",
      },
      {
        id: "14",
        icon: HiChevronRight,
        text: "Remisiones",
        to: "remisiones",
      },
    ],
    to: null,
  },
  {
    id: "2",
    open: 2,
    leftIcon: HiOutlineShieldCheck,
    rightIcon: HiChevronDown,
    text: "Usuarios",
    subOptions: [
      {
        id: "21",
        icon: HiChevronRight,
        text: "Ver Usuarios",
        to: "users",
      },
      {
        id: "22",
        icon: HiChevronRight,
        text: "Agregar Usuario",
        to: "new_user",
      },
    ],
    to: null,
  },
];

const simpleoptions = [
  {
    id: "home",
    icon: HiOutlineHome,
    text: "Home",
    sufixValue: null,
    to: "/",
  },
  {
    id: "profile",
    icon: HiUserCircle,
    text: "Mi Perfil",
    sufixValue: null,
    to: "profile",
  },
  {
    id: "settings",
    icon: HiMiniCog,
    text: "Configuración",
    sufixValue: null,
    to: "settings",
  },
  {
    id: "logout",
    icon: HiPower,
    text: "Cerrar Sesión",
    sufixValue: null,
    to: null,
  },
];

let commonOptions = [
  {
    id: "shared-files",
    icon: HiOutlineFolderOpen,
    text: "Compartidos",
    sufixValue: null,
    to: "/shared-files",
  },
  {
    id: "files",
    icon: HiOutlineFolderPlus,
    text: "Archivos",
    sufixValue: null,
    to: "/files",
  },
  {
    id: "logout",
    icon: HiPower,
    text: "Cerrar Sesión",
    sufixValue: null,
    to: null,
  },
]
const userOptions = [
  {
    id: "profile",
    icon: GoPerson,
    text: "Mi perfil",
    sufixValue: null,
    to: "/profile",
  },
  ...commonOptions
];

const adminOptions = [
  {
    id: "profile",
    icon: GoPerson,
    text: "Mi perfil",
    sufixValue: null,
    to: "/profile",
  },
  {
    id: 'deleted',
    icon: AiOutlineDelete,
    text: 'Eliminados',
    sufixValue: null,
    to: '/deleted-files'
  },
  ...commonOptions
]

export const menuOptionsArr: ISidebarItem[] = simpleoptions;
export const doctorMenuOptionsArr: ISidebarItem[] = userOptions;
export const adminMenuOptionsArr: ISidebarItem[] = adminOptions;
