import api from "../api/api";

// check if token is stored in local storage
// if yes - set token to authorization header, if not - remove it
export const setAuthToken = (token) => {
    if (token) {
        api.defaults.headers.common["Authorization"] = token;
    } else {
        delete api.defaults.headers.common["Authorization"];
    }
};
