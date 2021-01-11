import {
    ADD_COMMENT,
    ADD_POST,
    DELETE_COMMENT,
    DELETE_POST,
    GET_POST,
    GET_POSTS,
    POST_ERROR,
    UPDATE_LIKES
} from "../actions/types";


const initialState = {
    posts: [],
    post: null,
    loading: true,
    error: {}
}


export default function(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {

        case GET_POST:
            return {
                ...state,
                post: payload,
                loading: false
            };

        case GET_POSTS:
            return {
                ...state,
                posts: payload,
                loading: false
            };

        case UPDATE_LIKES:
            return {
                ...state,
                posts: state.posts.map(post => {
                    if (post._id === payload.postId) {
                        post.likes = payload.likes;
                    }
                    return post;
                }),
                loading: false
            };

        case ADD_COMMENT:
        case DELETE_COMMENT:
            return {
                ...state,
                post: {
                    ...state.post,
                    comments: payload
                },
                loading: false
            };

        case ADD_POST:
            return {
                ...state,
                posts: [payload, ...state.posts],
                loading: false
            };

        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(post => post._id !== payload),
                loading: false
            }

        case POST_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            };
        
        default:
            return state;
    }
}

