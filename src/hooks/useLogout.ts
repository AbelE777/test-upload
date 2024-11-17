import { useRecoilState } from 'recoil';
import { isAuthenticatedState, userState } from '../recoil/atoms';
import { removeFromLocalStorage } from '../utils';

function useLogout() {
  const [, setIsAuthenticated] = useRecoilState(isAuthenticatedState);
  const [, setUser] = useRecoilState(userState);

  const logout = () => {
    // Realiza cualquier limpieza necesaria
    // Por ejemplo, limpiar datos de usuario y token de acceso
    setUser({ user: null, access_token: null, isAdmin: false });
    setIsAuthenticated(false);

    // Elimina datos del almacenamiento local
    removeFromLocalStorage()
  };

  return logout;
}

export default useLogout;
