import axios from "axios";

import { setAlert } from "./alert";
import setAuthToken from "../utils/setAuthToken";
import api from "../utils/api";
import {
    REGISTER_SUCCESS,
	REGISTER_FAIL,
	USER_LOADED,
	AUTH_ERROR
} from "./types";


//	Load User
export const loadUser = () => async dispatch => {

	try {
		const res = await api.get("/auth");

		dispatch({
			type: USER_LOADED,
			payload: res.data
		});

	} catch (err) {

		dispatch({
			type: AUTH_ERROR
		});
	}
}

//	Register User
export const register = formData => async dispatch => {

    try {
		const res = await api.post('/users', formData);
	
		dispatch({
			type: REGISTER_SUCCESS,
			payload: res.data
		});

		dispatch(loadUser());

	} catch (err) {
		const errors = err.response.data.errors;

		errors && errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
	
		dispatch({
			type: REGISTER_FAIL
		});
    }
};