import React, { useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
// LOCAL
import { getPost } from "../../actions/post";
import Spinner from "../utils/Spinner";
import PostItem from "../posts/PostItem";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";


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
    <Fragment>

        <Link to="/posts" className="btn">
            Go Back
        </Link>

        <PostItem post={post} showActions={false} />

        <CommentForm postId={post._id} />

        <div className="comments">
            {
                post.comments.map(comment => (
                    <CommentItem key={comment._id} comment={comment} postId={post._id} />
                ))
            }
        </div>

    </Fragment>
}