import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { currentUserSelector } from '../recoil/selectors';

const useVerifyRol = (allowedRoles = [1, 2]) => {
  const navigate = useNavigate();
  const currentUser = useRecoilValue(currentUserSelector);

  const verifyRolAndRedirect = () => {
    if (currentUser.user?.rol && allowedRoles.includes(currentUser.user?.rol)) {
      // El rol del usuario está permitido, no se hace ninguna redirección
    } else {
      // El rol del usuario no está permitido, redirige a la página principal
      navigate('/', { replace: true });
    }
  };

  return verifyRolAndRedirect;
};

export default useVerifyRol;
