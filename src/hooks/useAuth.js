import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

//this custom hook returns created context, that includes roles and token
const useAuth = () => {
    return useContext(AuthContext);
};

export default useAuth;
