import { motion } from "framer-motion";

type Props = {
  children: JSX.Element[] | JSX.Element;
  onClick: () => void;
};

const BackDrop = ({ children, onClick }: Props) => {
  return (
    <motion.div
      onClick={onClick}
      className="z-50 fixed top-0 left-0 h-full w-full bg-black bg-opacity-75 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  );
};

export default BackDrop;
