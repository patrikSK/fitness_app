import { useNavigate } from "react-router-dom";
import useRole from "./useRole";
import api from "../api/api";

const useLogout = () => {
  const { setRole } = useRole();
  const navigate = useNavigate();

  return () => {
    setRole("");
    delete api.defaults.headers.common["Authorization"];
    window.localStorage.clear();
    navigate(0);
  };
};

export default useLogout;
