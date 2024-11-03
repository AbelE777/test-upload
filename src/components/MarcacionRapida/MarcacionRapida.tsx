import {
  IconButton,
  SpeedDial,
  SpeedDialHandler,
  SpeedDialContent,
  SpeedDialAction,
  Typography,
} from "@material-tailwind/react";
import {
  HiPlus,
  HiPower
} from "react-icons/hi2";
import { useLogout } from "../../hooks";
import { Link } from "react-router-dom";
import { createElement } from "react";
import { IconType } from "react-icons";

interface Props {
  info : {
    to: string,
    text: string,
    icon: IconType
  }[]
}

export default function MarcacionRapida({ info }: Props) {
  const logout = useLogout();

  return (
    <div className="">
      <div className="fixed bottom-5 right-5">
        <SpeedDial>
          <SpeedDialHandler>
            <IconButton size="lg" className="rounded-full dark:bg-blue-800 bg-blue-800">
              <HiPlus className="h-5 w-5 transition-transform group-hover:rotate-45" />
            </IconButton>
          </SpeedDialHandler>
          <SpeedDialContent>
            {info.map((option, idx) => (
              <Link key={idx} to={option.to}>
                <SpeedDialAction className="h-16 w-16 shadow-2xl">
                  {createElement(option.icon, {
                    className: "h-5 w-5 text-blue-gray-700",
                  })}
                  {/* <HiOutlineClipboardDocumentList className="h-5 w-5 text-blue-gray-700" /> */}
                  <Typography color="blue-gray" className="text-xs font-normal">
                    {option.text}
                  </Typography>
                </SpeedDialAction>
              </Link>
            ))}
            {/* <Link to="/users">
              <SpeedDialAction className="h-16 w-16">
                <HiShieldCheck className="h-5 w-5 text-blue-gray-700" />
                <Typography color="blue-gray" className="text-xs font-normal">
                  Usuarios
                </Typography>
              </SpeedDialAction>
            </Link>
            <Link to="/clients">
              <SpeedDialAction className="h-16 w-16">
                <HiOutlineUserGroup className="h-5 w-5 text-blue-gray-700" />
                <Typography color="blue-gray" className="text-xs font-normal">
                  Clientes
                </Typography>
              </SpeedDialAction>
            </Link> */}
            <div className="" onClick={logout}>
              <SpeedDialAction className="h-16 w-16 shadow-2xl">
                <HiPower className="h-5 w-5 text-red-600" />
                <Typography
                  color="blue-gray"
                  className="text-xs font-normal text-red-600"
                >
                  Logout
                </Typography>
              </SpeedDialAction>
            </div>
          </SpeedDialContent>
        </SpeedDial>
      </div>
    </div>
  );
}
