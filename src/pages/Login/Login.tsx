import { useNavigate, useLocation } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import LoginIllustration from "./components/LoginIllustration";
import { motion } from "framer-motion";
import { SubmitHandler } from "react-hook-form";
import { LoginFormValues } from "../../types";
import { useRecoilState } from "recoil";
import {
  isAuthenticatedState,
  isLoadingState,
  userState,
} from "../../recoil/atoms";
import { signIn } from "../../api/auth";
import { toast } from "sonner";
import { AxiosError } from "axios";

const Login = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [, setUser] = useRecoilState(userState);
  const [, setIsAuthenticated] = useRecoilState(isAuthenticatedState);
  const [, setIsLoading] = useRecoilState(isLoadingState);

  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    const { username, password } = data;
    setIsLoading(true);

    const credentials = { username, password };
    try {
      const data = await signIn(credentials);
      const { user, access_token } = data;
      if (user && access_token) {
        localStorage.setItem("access_token", access_token);
        localStorage.setItem("user_data", JSON.stringify(user));
        localStorage.setItem("is_authenticated", "true");
        // setAuth({ user: data });
        setUser({ user, access_token });
        setIsAuthenticated(true);
        navigate(from, { replace: true });
        setIsLoading(false);
      }
    } catch (err: unknown) {
      const error = err as AxiosError;
      if (error?.response?.status === 401) {
        toast.error("Error de Autenticación", {
          description: "Credenciales inválidas!",
        });
      } else {
        toast.error(
          "Ocurrió un error, por favor, comuníquese con el administrador del sistema"
        );
      }
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  };

  // useEffect(() => {
  //   const checkToken = async () => {
  //     const isValidToken = await validateToken();
  //     if (isValidToken) {
  //       // El token es válido, redirige al usuario a la página de inicio
  //       setIsAuthenticated(true);
  //       navigate(from, { replace: true });
  //     } else {
  //       // token inválido, el usuario debe iniciar sesión nuevamente
  //       toast.message("Por favor, inicia sesión para acceder");
  //     }
  //   };
  //   checkToken();
  // }, []);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        className="flex-grow px-4"
      >
        <section className="">
          <div className="container h-full">
            <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
              <div className="md:w-8/12 lg:w-5/12 mx-auto px-0 lg:px-5 lg:py-10">
                <h2 className="text-gray-600 dark:text-gray-300 px-10 lg:px-10 2lg:px-0 pt-10 text-center text-2xl font-bold dark:text-slate-100 mb-6">
                  Accede a tu cuenta para continuar.
                </h2>
                <LoginForm onSubmit={onSubmit} />
              </div>

              <LoginIllustration />
            </div>
          </div>
        </section>
      </motion.div>
      {/* <Footer /> */}
    </>
  );
};

export default Login;
