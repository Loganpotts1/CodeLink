import api from "./api";

export default function setAuthToken(token) {

    const {
        defaults: {
            headers: {
                common
            }
        }
    } = api;

    if (token) {

        common["x-auth-token"] = token;

        localStorage.setItem("token", token);

    } else {
        
        delete common["x-auth-token"];

        localStorage.removeItem("token");

    }
}