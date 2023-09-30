import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BsArrowLeft } from "react-icons/bs";
import { VscHome } from "react-icons/vsc";
import { HiMiniShieldExclamation } from "react-icons/hi2";

const Unauthorized = () => {
  return (
    <section className="bg-white dark:bg-gray-900 ">
      <div className="container flex items-center min-h-screen px-6 py-12 mx-auto">
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="flex flex-col items-center max-w-sm mx-auto text-center"
        >
          <p className="p-3 text-sm font-medium text-blue-500 rounded-full bg-blue-50 dark:bg-gray-800">
            <HiMiniShieldExclamation size={35}/>
          </p>
          <h1 className="mt-3 text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl">
            Acceso Restringido
          </h1>
          <p className="mt-4 text-gray-500 dark:text-gray-400">
            Lo sentimos, esta página solo está disponible para usuarios
            autorizados. Por favor, inicia sesión o regístrate para acceder a
            este contenido.
          </p>

          <div className="flex items-center w-full mt-6 gap-x-3 shrink-0 sm:w-auto">
            <Link to="/login">
              <button className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700">
              <BsArrowLeft size={20}/>

                <span>Regresar</span>
              </button>
            </Link>

            <Link to="/login">
              <button className="flex items-center justify-center gap-x-2 w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600">
                Ir a inicio
                <VscHome size={20}/>
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Unauthorized;
