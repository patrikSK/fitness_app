import useRole from "./useRole";
import api from "../api/api";

const useLogout = () => {
  const { setRole } = useRole();

  return () => {
    delete api.defaults.headers.common["Authorization"];
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setRole("");
  };
};

export default useLogout;
