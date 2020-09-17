import api from "./api";

export default function setAuthToken(token) {

    if (token) {

        api.defaults.headers.common["x-auth-token"] = token;

        localStorage.setItem("token", token);

    } else {
        
        delete api.defaults.headers.common["x-auth-token"];

        localStorage.removeItem("token");

    }
}