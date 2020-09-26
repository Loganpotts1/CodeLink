//  LOCAL
import api from "../utils/api";
import { setAlert } from "./alert";
import {
    GET_PROFILE,
    PROFILE_ERROR
} from "./types";


export const getCurrentProfile = () => async dispatch => {

    try {
        const res = await api.get("/profile/me");

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });

    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};


export const createProfile = (formData, history, edit = false) => async dispatch => {

    try {
        const res = await api.post("/profile", formData);

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });

        dispatch(setAlert(edit ? "Profile Edited" : "Profile Created", "success"));

        if (!edit)
        history.push("/dashboard");

    } catch (err) {
        const errors = err.response.data.errors;

		errors &&
		errors.forEach(error => 
			dispatch(setAlert(error.msg, "danger"))
        );
        
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};