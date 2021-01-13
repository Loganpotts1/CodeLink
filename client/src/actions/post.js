import api from "../utils/api";
import { setAlert } from "./alert";
import {
    ADD_COMMENT,
    DELETE_COMMENT,
    ADD_POST,
    DELETE_POST,
    GET_POST,
    GET_POSTS,
    POST_ERROR,
    UPDATE_LIKES
} from "./types";


export const getPost = postId => async dispatch => {

    try {

        const res = await api.get(`/posts/${postId}`);

        dispatch({
            type: GET_POST,
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


export const likePost = (postId) => async dispatch => {

    try {
        const res = await api.put(`posts/like/${postId}`);

        dispatch({
            type: UPDATE_LIKES,
            payload: {
                likes: res.data,
                postId
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


export const createComment = (postId, formData) => async dispatch => {

    try {
        const res = await api.post(`/posts/comment/${postId}`, formData);

        console.log(postId, formData);

        dispatch({
            type: ADD_COMMENT,
            payload: res.data
        });

        dispatch(setAlert("Comment Created", "success"));

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


export const deleteComment = (postId, commentId) => async dispatch => {

    try {
        const res = await api.delete(`/posts/comment/${postId}/${commentId}`);

        dispatch({
            type: DELETE_COMMENT,
            payload: res.data
        });

        dispatch(setAlert("Comment Deleted", "danger"));

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


export const createPost = formData => async dispatch => {

    try {
        const res = await api.post("/posts", formData);

        dispatch({
            type: ADD_POST,
            payload: res.data
        });

        dispatch(setAlert("Post Created", "success"));

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


export const deletePost = (postId) => async dispatch => {

    try {
        const res = await api.delete(`/posts/${postId}`);

        dispatch(setAlert("Post Deleted", "danger"));

        dispatch({
            type: DELETE_POST,
            payload: postId
        });

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