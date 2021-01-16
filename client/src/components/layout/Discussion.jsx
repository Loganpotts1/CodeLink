import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// LOCAL
import { getPost } from "../../actions/post";
import Spinner from "../utils/Spinner";
import PostItem from "../post/PostItem";
import PostForm from "../forms/PostForm";


export default function Post(props) {
    const { id } = props.match.params
    const { post, loading } = useSelector(state => state.post);
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(getPost(id));
        // eslint-disable-next-line
    }, []);


    return loading || !post || post._id !== id ?
    <Spinner /> :
    <main className="discussion">

        <button className="btn btn--return" onClick={() => {window.history.back()}}>
            <i className="fas fa-arrow-left"/>
        </button>

        <PostItem post={post} selected={true} />

        <div className="line"></div>

        <PostForm postId={post._id} selected={true} />

        <div className="discussion__comments">
            {
                post.comments.map(comment => (
                    <PostItem key={comment._id} comment={true} post={comment} postId={post._id} />
                ))
            }
        </div>

    </main>
}