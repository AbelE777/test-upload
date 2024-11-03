import {
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
} from "@material-tailwind/react";
import { createElement, useState } from "react";
import {
  HiUserCircle,
  HiChevronDown,
  HiOutlineFolderPlus,
  HiOutlineFolderOpen,
  HiOutlineLifebuoy,
  HiPower,
} from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { BsFolder2Open } from "react-icons/bs";
import { currentUserSelector } from "../../recoil/selectors";
import { useRecoilValue } from "recoil";
import { useLogout } from "../../hooks";

const profileMenuItems = [
  {
    label: "Compartidos",
    icon: HiOutlineFolderOpen,
    to: '/shared-files'
  },
  {
    label: "Archivos",
    icon: HiOutlineFolderPlus,
    to: '/files'
  },
  {
    label: "Cerrar Sesión",
    icon: HiPower,
    to: 'logout'
  },
];

function ProfileMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  const navigate = useNavigate();

  const handleButtonClick = (to:string) => {
    navigate(to);
  };
  const {user} = useRecoilValue(currentUserSelector);

  const logout = useLogout()

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto outline-none"
        >
          <Avatar
            variant="circular"
            size="sm"
            alt="tania andrew"
            className="border border-gray-500 p-0.5"
            src={user.profile_img}
          />
          <HiChevronDown
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${
              isMenuOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        {profileMenuItems.map(({ label, icon, to }, key) => {
          const isLastItem = key === profileMenuItems.length - 1;
          return (
            <span onClick={() => {
              if(to === "logout") {
                logout()
              } else handleButtonClick(to)
            }} className="outline-none" key={label}>
            <MenuItem
              
              onClick={closeMenu}
              className={`flex items-center gap-2 rounded ${
                isLastItem
                  ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                  : ""
              }`}
            >
              {createElement(icon, {
                className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                strokeWidth: 2,
              })}
              <Typography
                as="span"
                variant="small"
                className="font-normal"
                color={isLastItem ? "red" : "inherit"}
              >
                {label}
              </Typography>
            </MenuItem>
            </span>
          );
        })}
      </MenuList>
    </Menu>
  );
}
export default ProfileMenu