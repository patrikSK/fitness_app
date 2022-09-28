import { Navigate, Outlet } from "react-router-dom";
import useRole from "../hooks/useRole";

// this routes user can not see if is loged in
const UnrequireAuth = () => {
  const { role } = useRole();

  if (role === "ADMIN" || role === "USER") {
    return <Navigate to="programs" />;
  } else {
    return <Outlet />;
  }
};

export default UnrequireAuth;
