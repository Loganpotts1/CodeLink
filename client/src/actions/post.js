import api from "../utils/api";
import {
    GET_POSTS,
    POST_ERROR
} from "./types";


export const getAllPosts = () => async dispatch => {

    try {
        const res = await api.get("/posts");

        dispatch({
            type: GET_POSTS,
            payload: res.data
        });
        
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status 
            }
        });
    }
}