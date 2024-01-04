import notFound from "../../assets/svg/404-illustration.svg";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { BsArrowLeft } from "react-icons/bs";
import { VscHome } from "react-icons/vsc";


const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="container min-h-screen px-6 py-12 mx-auto lg:flex lg:items-center lg:gap-12">
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="wf-ull lg:w-1/2"
        >
          <p className="text-sm font-medium text-blue-500 dark:text-blue-400">
            404 error
          </p>
          <h1 className="mt-3 text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl">
            Página no encontrada
          </h1>
          <p className="mt-4 text-gray-500 dark:text-gray-400">
            Lo sentimos, parece que has llegado a un lugar que no existe. Si
            crees que esto es un error, por favor contáctanos para que podamos
            ayudarte.
          </p>

          <div className="flex items-center mt-6 gap-x-3 justify-center">
            
              <button onClick={()=>navigate(-1)} className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700">
                <BsArrowLeft size={20}/>
                <span>Regresar</span>
              </button>
            

            <Link to="/">
              <button className="flex items-center justify-center gap-x-2 w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600">
                Ir a inicio
                <VscHome size={20}/>
              </button>
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative w-full mt-12 lg:w-1/2 lg:mt-0"
        >
          <img className="w-full max-w-lg lg:mx-auto" src={notFound} alt="" />
        </motion.div>
      </div>
    </section>
  );
};

export default PageNotFound;
