// LOCAL
import api from "../utils/api";
import { setAlert } from "./alert";
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
};


export const likePost = (post_id) => async dispatch => {

    try {
        const res = await api.put(`posts/like/${post_id}`);

        dispatch({
            type: UPDATE_LIKES,
            payload: {
                likes: res.data,
                post_id
            }
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
};


export const deletePost = (post_id) => async dispatch => {

    try {
        const res = await api.delete(`/posts/${post_id}`);

        dispatch(setAlert(res.data.msg, "success"));

    } catch (err) {
        const errors = err.response.data.errors;

		errors &&
		errors.forEach(error => 
			dispatch(setAlert(error.msg, "danger"))
        );

        dispatch({
            type: POST_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status 
            }
        });
    }
};