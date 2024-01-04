import { motion } from 'framer-motion';

type Props = { 
  children: JSX.Element[] | JSX.Element;
}
const AnimatedButton = ({children}: Props) => {
  return (
    <motion.span whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
      {children}
    </motion.span>
  )
}

export default AnimatedButton