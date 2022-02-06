import { Navigate, Route } from "react-router-dom";
import { useAuth } from "../contexts";
import { useLocation } from "react-router-dom";

// export const PrivateRoute = ({ path, ...props }) => {
//   const { token } = useAuth();
//   return token ? (
//     <Route {...props} path={path} />
//   ) : (
//     <Navigate replace state={{ from: path }} to="/login" />
//   );
// };

export const PrivateRoute = ({ children }) => {
  const { token } = useAuth();
  const location = useLocation();

  return token ? (
    children
  ) : (
    <Navigate to="/login" replace state={{ path: location.pathname }} />
  );
};
