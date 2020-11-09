//  LOCAL
import api from "../utils/api";
import { setAlert } from "./alert";
import {
    GET_PROFILE,
    GET_PROFILES,
    UPDATE_PROFILE,
    PROFILE_ERROR,
    CLEAR_PROFILE
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


export const getProfileById = (userId) => async dispatch => {

    try {
        dispatch({ type: CLEAR_PROFILE });

        const res = await api.get(`/profile/users/${userId}`);

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


export const getAllProfiles = () => async dispatch => {

    try {
        const res = await api.get("/profile");

        dispatch({
            type: GET_PROFILES,
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

        dispatch(setAlert(
            edit ? "Profile Edited" : "Profile Created",
            "success"
        ));

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


export const addEducation = (formData, history) => async dispatch => {

    try {
        const res = await api.put("/profile/education", formData);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(setAlert("Education Added", "success"));

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


export const addExperience = (formData, history) => async dispatch => {

    try {
        const res = await api.put("/profile/experience", formData);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(setAlert("Experience Added", "success"));

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


export const deleteEducation = (id) => async dispatch => {

    try {
        const res = await api.delete(`/profile/education/${id}`);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(setAlert("Education Deleted", "danger"));

    } catch (err) { 
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};


export const deleteExperience = (id) => async dispatch => {

    try {
        const res = await api.delete(`/profile/experience/${id}`);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(setAlert("Experience Deleted", "danger"));

    } catch (err) { 
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};