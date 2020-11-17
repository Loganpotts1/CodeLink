import {
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

        case GET_POSTS:
            return {
                ...state,
                posts: payload,
                loading: false
            };

        case UPDATE_LIKES:
            const updatedPosts = state.posts.map(post => {
                if (post._id === payload.post_id) {
                    post.likes = payload.likes;
                }
                return post;
            });

            return {
                ...state,
                posts: updatedPosts,
                loading: false
            };

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

