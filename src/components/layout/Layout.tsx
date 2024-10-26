import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Footer from "../../pages/Login/components/Footer";
import { CustomSpinner } from "..";
import { useRecoilState, useRecoilValue } from "recoil";
import { isLoadingSelector } from "../../recoil/selectors";
import { useEffect } from "react";
import { isAuthenticatedState } from "../../recoil/atoms";
import { Toaster, toast } from "sonner";
import { validateToken } from "../../api/auth";
import { useLogout } from "../../hooks";

const Layout = () => {
  const isLoading = useRecoilValue(isLoadingSelector);
  const [, setIsAuthenticated] = useRecoilState(isAuthenticatedState);
  const logout = useLogout();
  const navigate = useNavigate();
  const location = useLocation();
  // const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    const checkToken = async () => {
      const isValidToken = await validateToken();
      // console.log("isValidToken", isValidToken);
      if (isValidToken) {
        // El token es válido, redirige al usuario a la página de inicio
        setIsAuthenticated(true);
        if (location.pathname === "/login") {
          navigate("/");
        }
        // navigate(from, { replace: true });
      } else {
        // token inválido, el usuario debe iniciar sesión nuevamente
        logout();
        toast.message("Por favor, inicia sesión para acceder");
      }
    };
    checkToken();
  }, []);

  return (
    <>
      <Toaster position="top-right" richColors closeButton />
      <main className="flex flex-col min-h-screen">
        <Outlet />
      </main>
      {isLoading && <CustomSpinner />}
      <Footer />
    </>
  );
};

export default Layout;
