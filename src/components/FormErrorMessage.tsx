import { motion } from "framer-motion";

const FormErrorMessage = ({ children }: { children: React.ReactNode }) => {
  const variants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };
  return (
    <motion.p
      initial="hidden"
      animate="visible"
      variants={variants}
      className="mb-3 text-sm text-center text-red-500"
    >
      {children}
    </motion.p>
  );
};

export default FormErrorMessage;
