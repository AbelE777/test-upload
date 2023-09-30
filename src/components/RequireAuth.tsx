import { useLocation, Navigate } from "react-router-dom";
// import { useAuth } from "../hooks";
import AuthorizedLayout from "./AuthorizedLayout/AuthorizedLayout";
// import { userState } from "../recoil/atoms";
import { useRecoilValue } from "recoil";
import { isAuthenticatedSelector } from "../recoil/selectors/authSelectors";


const RequireAuth = () => {
  // const { auth } = useAuth();
  const location = useLocation();
  // const { user, access_token } = useRecoilValue(userState);
  const isAuthenticated = useRecoilValue(isAuthenticatedSelector)

  return (isAuthenticated) ? (
    <AuthorizedLayout />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
