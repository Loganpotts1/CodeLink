import React, { Fragment } from "react";
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


    return (
        <section className="post">


            <header className="post__header">

                <Link className="post__user" to={`/profile/${user}`}>
                    <img src={avatar} alt="user avatar" />
                    <h4>
                        {name}
                    </h4>
                </Link>

                <p className="post__date">
                    Posted on {formatDate(date, true)}
                </p>
                
            </header>
            

            <p className="post__text">
                {text}
            </p>
                

            <aside className="post__actions">

                <button onClick={() => dispatch(likePost(_id))} className="btn btn--tertiary post__likes">
                    <i className="fas fa-thumbs-up" />
                    <span className="post__likes-count">
                        {likes.length > 0 && <span> {likes.length}</span>}
                    </span>
                </button>

                <Link to={`/posts/${_id}`} className="btn btn--tertiary post__discussion">
                    Discussion
                    {" "}
                    {comments.length > 0 && <span className="post__comment-count">{comments.length}</span>}
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