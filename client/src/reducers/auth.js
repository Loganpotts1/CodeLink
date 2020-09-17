import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR
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
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false
            };

        case REGISTER_FAIL:
        case AUTH_ERROR:
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false
            };

        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: payload
            };
        
        default:
            return state;
    }
}