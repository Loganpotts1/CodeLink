import api from "./api";


export default function setAuthToken(token) {
    const { common } = api.defaults.headers;

    if (token) {

        common["x-auth-token"] = token;

        localStorage.setItem("token", token);

    } else {
        
        delete common["x-auth-token"];

        localStorage.removeItem("token");

    }
}