import api from "../utils/api";
import {
    GET_POSTS,
    POST_ERROR,
    UPDATE_LIKES
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


export const likePost = (post_id) => async dispatch => {

    try {
        const res = await api.put(`/like/${post_id}`);

        dispatch({
            type: UPDATE_LIKES,
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