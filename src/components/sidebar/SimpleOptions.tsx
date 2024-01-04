import {
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
} from "@material-tailwind/react";

import RenderIcon from "./RenderIcon";
import { ISidebarItem } from "../../types";
import { Link, useNavigate } from "react-router-dom";
import classNames from "classnames";
import { useLogout } from "../../hooks";

const SimpleOptions = ({
  menuOptionsArr,
}: {
  menuOptionsArr: ISidebarItem[];
}) => {
  const myDarkClass = classNames([
    "dark:text-gray-400",
    "dark:focus:text-gray-900",
    "dark:focus:bg-gray-400",
    "dark:hover:text-gray-900",
  ]);
  const myLightClass = classNames([
    "text-gray-800",
    "hover:bg-blue-gray-50",
    "hover:bg-opacity-80",
    "focus:bg-gray-200",
    "focus:bg-opacity-80",
    "active:bg-blue-gray-50",
  ]);
  const navigate = useNavigate();
  const logout = useLogout();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  return (
    <>
      {menuOptionsArr.map((option) => {
        if (option.to) {
          return (
            <Link to={option.to} key={option.id}>
              <ListItem
                className={`${myDarkClass} ${myLightClass} active:bg-opacity-80 hover:text-blue-gray-900 focus:text-blue-gray-900`}
              >
                <ListItemPrefix>
                  {option.iconImg ? (
                    <img src={option.iconImg} alt="rx" width={30} />
                  ) : (
                    <RenderIcon icon={option.icon} nameclass="h-5 w-5" />
                  )}
                </ListItemPrefix>
                {option.text}
                {option.sufixValue && (
                  <ListItemSuffix className="inset-x-0">
                    <Chip
                      value={option.sufixValue}
                      size="sm"
                      variant="ghost"
                      color="teal"
                      className="rounded-full dark:text-gray-500"
                    />
                  </ListItemSuffix>
                )}
              </ListItem>
            </Link>
          );
        } else {
          return (
            <ListItem
              key={option.id}
              className={`${myDarkClass} ${myLightClass} active:bg-opacity-80 hover:text-blue-gray-900 focus:text-blue-gray-900`}
              onClick={() => {
                if (option.id === "logout") {
                  handleLogout();
                }
              }}
            >
              <ListItemPrefix>
                <RenderIcon icon={option.icon} nameclass="h-5 w-5" />
              </ListItemPrefix>
              {option.text}
              {option.sufixValue && (
                <ListItemSuffix className="inset-x-0">
                  <Chip
                    value={option.sufixValue}
                    size="sm"
                    variant="ghost"
                    color="teal"
                    className="rounded-full dark:text-gray-500"
                  />
                </ListItemSuffix>
              )}
            </ListItem>
          );
        }
      })}
    </>
  );
};

export default SimpleOptions;
