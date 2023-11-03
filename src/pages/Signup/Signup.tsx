import signupIllustration from "../../assets/svg/signup-illustration.svg";
import { SubmitHandler } from "react-hook-form";
import { IUserRegistrationFormValues } from "../../types";
import { getFromPath } from "../../utils/getFromPath";
import { useLocation, useNavigate } from "react-router-dom";
import SignupForm from "./components/SignupForm";
import { motion } from "framer-motion";

const Signup = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const onSubmit: SubmitHandler<IUserRegistrationFormValues> = (data) => {
    console.log(data);
    // setAuth({ user: data });
    const from = getFromPath(location);
    navigate(from, { replace: true });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9 }}
      className="flex items-center justify-center py-5"
    >
      <div
        className="dark:bg-gray-900 bg-white-100 text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden"
        style={{ maxWidth: "1000px" }}
      >
        <div className="md:flex w-full">
          <div className="hidden md:block w-1/2 bg-indigo-500 py-10 px-10">
            <img src={signupIllustration} alt="signup Illustration" />
          </div>
          <div className="w-full md:w-1/2 py-10 px-5 md:px-10">
            <div className="text-center mb-10">
              <h1 className="font-bold text-3xl text-gray-700 dark:text-gray-200">
                REGÍSTRATE
              </h1>
              <p className="text-gray-700 dark:text-gray-200">
                Ingresa tu información para comenzar
              </p>
            </div>
            <SignupForm onSubmit={onSubmit} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Signup;
