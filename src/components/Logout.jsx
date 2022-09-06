import useAuth from "../hooks/useAuth";
import api from "../api/api";

const Logout = () => {
    const { setAuth } = useAuth();

    const logout = () => {
        delete api.defaults.headers.common["Authorization"];
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        setAuth("");
    };

    return <span onClick={logout}>log out</span>;
};

export default Logout;
