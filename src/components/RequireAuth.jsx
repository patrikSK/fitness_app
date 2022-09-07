import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

//creates protected routes wrapper
const RequireAuth = ({ allowedRoles }) => {
  // laod roles from context
  const { auth } = useAuth();

  if (allowedRoles.includes(auth.role)) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" replace />;
  }
};

export default RequireAuth;
