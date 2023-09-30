import {
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { useState } from "react";
import { HiChevronRight, HiChevronDown } from "react-icons/hi2";
import { IAccordionOptions } from "../../types";
import RenderIcon from "./RenderIcon";
import { Link } from "react-router-dom";

interface Props {
  mainMenuOptionsArr: IAccordionOptions[];
}

const AccordionOptions = ({ mainMenuOptionsArr }: Props) => {
  const [open, setOpen] = useState(0);

  const handleOpen = (value: number) => {
    setOpen(open === value ? 0 : value);
  };
  return (
    <>
      {mainMenuOptionsArr.map((option) => (
        <Accordion
          key={option.id}
          open={open === option.open}
          icon={
            <HiChevronDown
              size={22}
              className={`mx-auto transition-transform dark:text-gray-400 ${
                open === option.open ? "rotate-180" : ""
              }`}
            />
          }
        >
          <ListItem className={`p-0`} selected={open === option.open}>
            <AccordionHeader
              onClick={() => handleOpen(option.open!)}
              className="border-b-0 p-3"
            >
              <ListItemPrefix>
                <RenderIcon
                  icon={option.leftIcon}
                  nameclass="h-5 w-5 dark:text-gray-400"
                />
              </ListItemPrefix>
              <Typography
                color="blue-gray"
                className="dark:text-gray-400 mr-auto font-normal"
              >
                {option.text}
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List className="p-0">
              {option.subOptions.map((suboption) => (
                <Link to={suboption.to ? suboption.to : "#/"} key={suboption.id}>
                  <ListItem
                    className="dark:text-gray-400 dark:focus:text-gray-900 dark:hover:text-gray-900"
                  >
                    <ListItemPrefix>
                      <HiChevronRight className="h-3 w-5" />
                    </ListItemPrefix>
                    {suboption.text}
                  </ListItem>
                </Link>
              ))}
            </List>
          </AccordionBody>
        </Accordion>
      ))}
    </>
  );
};

export default AccordionOptions;
