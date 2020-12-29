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
        },
        showActions = true
    } = props;
    const { auth } = useSelector(state => state);
    const dispatch = useDispatch();


    return (
        <section className="post">

            <div>
                <Link to={`/profile/${user}`}>
                    <img className="posts-item__avatar" src={avatar} alt="" />
                    <h4>
                        {name}
                    </h4>
                </Link>
            </div>

            <div>
                <p className="my-1">
                    {text}
                </p>
                <p className="posts-item__date">
                    Posted on {formatDate(date, true)}
                </p>
                {
                    showActions &&
                    <Fragment>

                        <Link to={`/posts/${_id}`} className="btn btn--tertiary">
                            Discussion
                            {" "}
                            {comments.length > 0 && <span className="comment-count">{comments.length}</span>}
                        </Link>

                        <button onClick={() => dispatch(likePost(_id))} type="button" className="btn btn-dark">
                            <i className="fas fa-thumbs-up" />
                            <span>
                                {likes.length > 0 && <span> {likes.length}</span>}
                            </span>
                        </button>

                        {
                            !auth.loading && user === auth.user._id &&
                            <button onClick={() => dispatch(deletePost(_id))} type="button" className="btn btn-danger">
                                <i className="fas fa-times" />
                            </button>
                        }

                    </Fragment>
                }
            </div>
            
        </section>
    );
}