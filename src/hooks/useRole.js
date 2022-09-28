import { useContext } from "react";
import RoleContext from "../context/RoleProvider";

const useRole = () => {
  return useContext(RoleContext);
};

export default useRole;
