import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
// LOCAL
import formatDate from "../../utils/formatDate";
import { likePost, deletePost } from "../../actions/post";


export default function PostItem(props) {
    const {
        post: {
            _id,
            text,
            name,
            avatar,
            user,
            likes,
            comments,
            date
        }
    } = props;
    const { auth } = useSelector(state => state);
    const dispatch = useDispatch();


    const [ userLiked, setUserLiked ] = useState(
        likes.some(({ user }) => user === auth.user._id)
    );


    const likeCurrentPost = () => {
        dispatch(likePost(_id));
        setUserLiked(!userLiked);
    };


    return (
        <section className="post">


            <header className="post__header">

                <Link className="post__user" to={`/profile/${user}`}>
                    <img src={avatar} alt="user avatar" />
                    <p>
                        {name}
                    </p>
                </Link>

                <p className="post__date">
                    Posted on {formatDate(date, true)}
                </p>
                
            </header>
            

            <p className="post__text">
                {text}
            </p>
                

            <aside className="post__actions">

                <button onClick={likeCurrentPost} className={`btn btn--tertiary post__likes ${ userLiked ? `post__likes--active` : `` }`}>
                    <i className="fas fa-thumbs-up" />
                    <span className="post__likes-count">
                        {likes.length > 0 && <sup>{likes.length}</sup>}
                    </span>
                </button>

                <Link to={`/posts/${_id}`} className="btn btn--tertiary post__discussion">
                    Comments
                    {" "}
                    {comments.length > 0 && <sup className="post__comment-count">{comments.length}</sup>}
                </Link>

                {
                    !auth.loading && user === auth.user._id &&
                    <button onClick={() => dispatch(deletePost(_id))} type="button" className="btn btn--tertiary post__delete">
                        <i className="fas fa-times" />
                    </button>
                }

            </aside>
            
        </section>
    );
}