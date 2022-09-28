import useRole from "../hooks/useRole";
import api from "../api/api";

const Logout = () => {
  const { setRole } = useRole();

  const logout = () => {
    delete api.defaults.headers.common["Authorization"];
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setRole("");
  };

  return <span onClick={logout}>log out</span>;
};

export default Logout;
