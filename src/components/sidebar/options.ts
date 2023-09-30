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
      }
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
      }
    ],
    to: null,
  }
];

export const menuOptionsArr: ISidebarItem[] = [
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
