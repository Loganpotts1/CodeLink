import {
    REGISTER_SUCCESS,
    // REGISTER_FAIL,
    USER_LOADED, 
    LOGOUT,
    AUTH_ERROR, LOGIN_SUCCESS
} from "../actions/types";


const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    loading: true,
    user: null
};

export default function(state = initialState, action) {
    const { type, payload } = action;


    switch(type) {

        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false
            };

        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: payload
            };

        case LOGOUT:
        case AUTH_ERROR:
            return {
                token: null,
                isAuthenticated: null,
                loading: false,
                user: null
            };
        
        default:
            return {
                ...state,
                loading: false
            };
    }
}