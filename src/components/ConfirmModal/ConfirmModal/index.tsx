import { motion } from "framer-motion";
import BackDrop from "../Backdrop";

type Props = {
  handleClose:() => void,
  children: JSX.Element[] | JSX.Element;
}

const ConfirmModal = ({ handleClose, children }: Props) => {
  const dropIn = {
    hidden: {
      y: "-100vh",
      opacity: 0,
    },
    visible: {
      y: "0",
      opacity: 1,
      transition: {
        duration: 0.1,
        type: "spring",
        damping: 25,
        stiffness: 500,
      },
    },
    exit: {
      y: "100vh",
      opacity: 0,
    },
  };

  return (
    <BackDrop onClick={handleClose}>
      <motion.div
        drag
        onClick={(e) => e.stopPropagation()}
        className="w-[clamp(50%,700px,90%)] h-[min(50%,300px)] h-auto mx-auto p-8 rounded-lg flex flex-col items-center bg-white dark:bg-gray-900"
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {children}
        
      </motion.div>
    </BackDrop>
  );
};

export default ConfirmModal;
