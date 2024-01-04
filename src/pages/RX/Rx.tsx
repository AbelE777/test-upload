import { motion } from "framer-motion";
import { Title } from "../../components";

const Rx = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9 }}
    >
      <Title size="large" color="gray-800" position="left">
        RX pacientes
      </Title>
    </motion.div>
  );
};

export default Rx;
