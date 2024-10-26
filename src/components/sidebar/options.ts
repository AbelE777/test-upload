import {
  HiChevronRight,
  HiOutlineShieldCheck,
  HiOutlineHome,
  HiChevronDown,
  HiUserCircle,
  HiMiniCog,
  HiPower,
  HiOutlineUserGroup,
  HiPhoto
} from "react-icons/hi2";
import {FaHandHoldingDollar} from "react-icons/fa6"
import { BsFolder2Open } from "react-icons/bs";
import { IAccordionOptions, ISidebarItem } from "../../types";

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
const doctorsimpleoptions = [  
  // {
  //   id: "home",
  //   icon: HiOutlineHome,
  //   text: "Home",
  //   sufixValue: null,
  //   to: "/",
  // },
  // {
  //   id: "profile",
  //   icon: HiUserCircle,
  //   text: "Mi Perfil",
  //   sufixValue: null,
  //   to: "profile",
  // },
  // {
  //   id: "settings",
  //   icon: HiMiniCog,
  //   text: "Configuración",
  //   sufixValue: null,
  //   to: "settings",
  // },
  // {
  //   id: "gallery",
  //   icon: HiPhoto,
  //   iconImg: "src/assets/img/4100761.png",
  //   text: "RX Pcte",
  //   sufixValue: null,
  //   to: "rx",
  // },
  {
    id: "files",
    icon: BsFolder2Open,
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
];

export const menuOptionsArr: ISidebarItem[] = simpleoptions;
export const doctorMenuOptionsArr: ISidebarItem[] = doctorsimpleoptions;
