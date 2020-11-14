import api from "../utils/api";
import { setAlert } from "./alert";
import {
    REGISTER_SUCCESS,
	REGISTER_FAIL,
	USER_LOADED,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT,
	CLEAR_PROFILE,
	ACCOUNT_DELETED
} from "./types";


export const register = formData => async dispatch => {

    try {
		const res = await api.post("/users", formData);
	
		dispatch({
			type: REGISTER_SUCCESS,
			payload: res.data
		});

		dispatch(loadUser());

	} catch (err) {
		const errors = err.response.data.errors;

		errors &&
		errors.forEach(error => 
			dispatch(setAlert(error.msg, "danger"))
		);
	

		dispatch({
			type: REGISTER_FAIL
		});
    }
};


export const login = formData => async dispatch => {

	try {
		const res = await api.put("/auth", formData);

		dispatch({
			type: LOGIN_SUCCESS,
			payload: res.data
		});

		dispatch(loadUser());

	} catch (err) {
		const errors = err.response.data.errors;

		errors &&
		errors.forEach(error => 
			dispatch(setAlert(error.msg, "danger"))
		);
		
		
		dispatch({
			type: LOGIN_FAIL,
		})
	}
};


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
};


export const logout = () => dispatch => {
	dispatch({ type: CLEAR_PROFILE });
	dispatch({ type: LOGOUT });
};


export const deleteAccount = () => async dispatch => {

	if (window.confirm("Are you sure? This can't be undone.")) {
		try {
			await api.delete("/users");
	
			dispatch({ type: CLEAR_PROFILE });
			dispatch({ type: ACCOUNT_DELETED });

			dispatch(setAlert("Your account and profile have been deleted"));
	
		} catch (err) {
			dispatch({
				type: AUTH_ERROR
			});
		}
	}
}