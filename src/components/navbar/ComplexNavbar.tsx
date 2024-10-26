import React from "react";
import {
  Navbar,
  Collapse,
  Typography,
  Menu,
  MenuHandler,
  MenuItem,
  IconButton,
  MenuList,
} from "@material-tailwind/react";
import {
  HiCubeTransparent,
  HiUserCircle,
  HiOutlineCodeBracketSquare,
  HiOutlineSquare3Stack3D,
  HiChevronDown,
  HiMiniBars2,
} from "react-icons/hi2";
import ProfileMenu from "./ProfileMenu";
import classNames from "classnames";
import logo from "../../assets/img/isotipo.png";
import { Link } from "react-router-dom";
import { currentUserSelector } from "../../recoil/selectors";
import { useRecoilValue } from "recoil";

const fontDarkLight = classNames("text-blue-gray-900 dark:text-gray-300");

// nav list menu
const navListMenuItems1 = [
  {
    title: "Agregar Cliente",
    link: "/new_client",
  },
  {
    title: "Agregar Usuario",
    link: "/new_user",
  },
  {
    title: "Facturar Cliente",
    link: "/facturacion",
  },
  {
    title: "Remisiones",
    link: "/remisiones",
  },
];
const navListMenuItems2 = [
  {
    title: "Ver Clientes",
    link: "/clients",
  },
  {
    title: "Ver usuarios",
    link: "/users",
  },
  {
    title: "Configuración",
    link: "/settings",
  },
];

function NavListMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const renderItems1 = navListMenuItems1.map(({ title, link }) => (
    <MenuItem key={title}>
      <Link to={link}>
        <Typography variant="h6" color="blue-gray" className="mb-1 font-medium">
          {title}
        </Typography>
      </Link>
    </MenuItem>
  ));
  const renderItems2 = navListMenuItems2.map(({ title, link }) => (
    <MenuItem key={title}>
      <Link to={link}>
        <Typography variant="h6" color="blue-gray" className="mb-1 font-medium">
          {title}
        </Typography>
      </Link>
    </MenuItem>
  ));

  return (
    <React.Fragment>
      <Menu allowHover open={isMenuOpen} handler={setIsMenuOpen}>
        <MenuHandler>
          <Typography as="a" href="#" variant="small" className="font-normal">
            <MenuItem
              className={`hidden items-center gap-2 lg:flex lg:rounded-full ${fontDarkLight}`}
            >
              <HiOutlineSquare3Stack3D className="h-[18px] w-[18px]" /> Páginas{" "}
              <HiChevronDown
                strokeWidth={2}
                className={`h-3 w-3 transition-transform ${
                  isMenuOpen ? "rotate-180" : ""
                }`}
              />
            </MenuItem>
          </Typography>
        </MenuHandler>
        <MenuList className="hidden w-[32rem] overflow-visible lg:flex">
          <ul className="outline-none flex-col w-full">{renderItems1}</ul>
          <ul className="outline-none flex-col w-full">{renderItems2}</ul>
        </MenuList>
      </Menu>
      <MenuItem className="flex items-center gap-2 text-blue-gray-900 lg:hidden">
        <HiOutlineSquare3Stack3D className="h-[18px] w-[18px]" /> Páginas{" "}
      </MenuItem>
      <ul className="ml-6 flex w-full flex-col gap-1 lg:hidden">
        {renderItems1}
        {renderItems2}
      </ul>
    </React.Fragment>
  );
}

// nav list component
const navListItems = [
  {
    label: "Mi Perfil",
    icon: HiUserCircle,
    to: "/profile",
  },
  {
    label: "Blocks",
    icon: HiCubeTransparent,
    to: "/profile",
  },
  {
    label: "Docs",
    icon: HiOutlineCodeBracketSquare,
    to: "/profile",
  },
];

function NavList() {
  const { user } = useRecoilValue(currentUserSelector);
  return (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
      {user.rol !== 3 && <NavListMenu />}
      {navListItems.map(({ label, icon, to }) => {
        return (
          // <Typography
          //   key={label}
          //   as="a"
          //   href="#"
          //   variant="small"
          //   color="blue-gray"
          //   className={`font-normal ${fontDarkLight}`}
          // >
          //   <MenuItem className="flex items-center gap-2 lg:rounded-full">
          //     {React.createElement(icon, { className: "h-[18px] w-[18px]" })}{" "}
          //     {label}
          //   </MenuItem>
          // </Typography>
          <Link to={to} key={label}>
            <Typography
              href="#"
              variant="small"
              color="blue-gray"
              className={`font-normal ${fontDarkLight}`}
            >
              <MenuItem className="flex items-center gap-2 lg:rounded-full">
                {React.createElement(icon, { className: "h-[18px] w-[18px]" })}{" "}
                {label}
              </MenuItem>
            </Typography>
          </Link>
        );
      })}
    </ul>
  );
}

function ComplexNavbar() {
  const [isNavOpen, setIsNavOpen] = React.useState(false);

  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setIsNavOpen(false)
    );
  }, []);

  return (
    <Navbar className="bg-white dark:bg-gray-900 border-none sticky top-0 z-50 mx-auto max-w-none p-2 rounded-none lg:pl-6">
      <div className={`relative mx-auto flex items-center ${fontDarkLight}`}>
        <Link to="/" className="flex items-center">
          <img src={logo} alt="" width={28} />
          <Typography className="mr-4 ml-2 cursor-pointer py-1.5 font-medium">
            JAR
          </Typography>
        </Link>
        {/* <div className="absolute top-2/4 left-2/4 hidden -translate-x-2/4 -translate-y-2/4 lg:block">
          <NavList />
        </div> */}
        <IconButton
          size="sm"
          color="blue-gray"
          variant="text"
          onClick={toggleIsNavOpen}
          className="ml-auto mr-2 lg:hidden"
        >
          <HiMiniBars2 className="h-6 w-6" />
        </IconButton>
        <ProfileMenu />
      </div>
      <Collapse open={isNavOpen} className="overflow-scroll">
        <NavList />
      </Collapse>
    </Navbar>
  );
}
export default ComplexNavbar;
