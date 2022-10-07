import { Navigate, Outlet } from "react-router-dom";
import useRole from "../hooks/useRole";

//creates protected routes wrapper
const RequireAuth = ({ allowedRoles }) => {
  // laod roles from context
  const { role } = useRole();

  if (allowedRoles.includes(role)) {
    return <Outlet />;
  } else {
    return <Navigate to="/" replace />;
  }
};

export default RequireAuth;
