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
        <div className="post bg-white p-1 my-1">

            <div>
                <Link to={`/profile/${user}`}>
                    <img className="round-img" src={avatar} alt="" />
                    <h4>
                        {name}
                    </h4>
                </Link>
            </div>

            <div>
                <p className="my-1">
                    {text}
                </p>
                <p className="post-date">
                    Posted on {formatDate(date)}
                </p>
                {
                    showActions &&
                    <Fragment>

                        <Link to={`/posts/${_id}`} className="btn btn-dark">
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
            
        </div>
    );
}