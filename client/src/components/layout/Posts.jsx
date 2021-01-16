import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
//  LOCAL
import { getAllPosts } from "../../actions/post";
import Spinner from "../utils/Spinner";
import PostForm from "../forms/PostForm";
import PostItem from "../post/PostItem";


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

    return loading ?
        <Spinner /> :
        <main className="posts">

            <h1 className="posts__heading">
                Posts
            </h1>

            <PostForm />

            <div className="line"></div>

            <div className="posts__container">
                {
                    posts.map(post => (
                        <PostItem key={post._id} post={post} />
                    ))
                }
            </div>

        </main>;
}