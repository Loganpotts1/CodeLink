import axios from "axios";

import { setAlert } from "./alert";
import setAuthToken from "../utils/setAuthToken";
import api from "../utils/api";
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from "./types";


// Register User
export const register = formData => async dispatch => {
    try {
		const res = await api.post('/users', formData);

		setAuthToken(res.data.token);
	
		dispatch({
			type: REGISTER_SUCCESS,
			payload: res.data
		});



	} catch (err) {
		const errors = err.response.data.errors;

		errors && errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
	
		dispatch({
			type: REGISTER_FAIL
		});
    }
};