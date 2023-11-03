import {
  Checkbox,
  List,
  ListItem,
  ListItemPrefix,
  Typography,
  Card,
} from "@material-tailwind/react";
import {PiToothDuotone} from 'react-icons/pi'
import { motion } from "framer-motion";
import { FormEvent } from "react";

interface ContentStep2Type {
  activeStep: number;
  services: {
    id: string;
    nombre: string;
    precios: number[];
    remision: number;
    checked: boolean;
    piezas?: number[];
  }[];
  onChangeSelectService: (
    service: {
      id: string;
      nombre: string;
      precios: number[];
      remision: number;
      checked: boolean;
      piezas?: number[];
    },
    e: FormEvent<HTMLDivElement>
  ) => void;
}


const ContentStep2 = ({
  activeStep,
  services,
  onChangeSelectService,
}: ContentStep2Type) => {
  return (
    <Card
      className={`md:w-1/2 md:mx-auto mt-10 ${
        activeStep === 2 ? "block" : "hidden"
      }`}
    >
      <List className="flex-col dark:bg-gray-900">
        {services.map((service) => (
          <ListItem key={service.id} className="p-0 dark:hover:bg-gray-700">
            <label
              htmlFor={service.id}
              className="flex w-full cursor-pointer items-center px-3 py-2"
            >
              <ListItemPrefix className="mr-3">
                <Checkbox
                  crossOrigin="true"
                  id={service.id}
                  ripple={false}
                  className="hover:before:opacity-0 rounded-full"
                  color="indigo"
                  containerProps={{
                    className: "p-0",
                  }}
                  checked={service.checked}
                  onChange={(e) => onChangeSelectService(service, e)}
                />
              </ListItemPrefix>
              <Typography
                color="blue-gray"
                className="font-medium block uppercase dark:text-gray-100"
              >
                {service.nombre}{" "}
                {service.piezas?.length ? (
                  <motion.strong
                    className="font-normal block"
                    transition={{ duration: 0.3, delay: 0.2 }}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                  >
                    <span className="flex items-center"><PiToothDuotone size={23}/> {service.piezas.join(", ")}</span>
                  </motion.strong>
                ) : null}
              </Typography>
            </label>
          </ListItem>
        ))}
      </List>
    </Card>
  );
};

export default ContentStep2;
