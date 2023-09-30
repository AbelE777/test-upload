import { HiOutlineExclamationTriangle } from "react-icons/hi2";
import { Typography } from "@material-tailwind/react";
import { motion } from "framer-motion";

const SinResultados = () => {
  return (
    <motion.div
      animate={{ x: [0, -5, 5, -5, 0] }}
      transition={{ duration: 0.5 }}
      className="cursor-pointer"
    >
      <Typography
        variant="h4"
        className="flex items-center gap-2 justify-center text-gray-700"
      >
        <HiOutlineExclamationTriangle size={30} strokeWidth={2} />
        Sin Resultados
      </Typography>
    </motion.div>
  );
};

export default SinResultados;
