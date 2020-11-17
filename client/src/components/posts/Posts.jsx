import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
//  LOCAL
import { getAllPosts } from "../../actions/post";
import Spinner from "../utils/Spinner";
import PostItem from "./PostItem";


export default function Posts() {
    const {
        post: {
            posts,
            loading
        }
    } = useSelector(state => state);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllPosts());
        // eslint-disable-next-line
    },[]);

    return (
        loading ?
        <Spinner /> :
        <Fragment>

            <h1 className="lead text-primary">
                Posts
            </h1>

            <p className="lead">
                <i className="fas fa-user"></i>
                {" Welcome to the community"}
            </p>

            {/*Post Form*/}

            <div className="posts">
                {
                    posts.map(post => (
                        <PostItem key={post._id} post={post} />
                    ))
                }
            </div>

        </Fragment>
    );
}