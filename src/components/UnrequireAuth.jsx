import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

// this routes user can not see if is loged in
const UnrequireAuth = () => {
  const { auth } = useAuth();

  if (auth.role === "ADMIN" || auth.role === "USER") {
    return <Navigate to="programs" />;
  } else {
    return <Outlet />;
  }
};

export default UnrequireAuth;
