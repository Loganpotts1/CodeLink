import React, { Fragment, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { convertFromRaw } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import DOMPurify from "dompurify";
import { Link } from "react-router-dom";
// LOCAL
import formatDate from "../../utils/formatDate";
import { likePost, deletePost, deleteComment } from "../../actions/post";
import guestIcon from "../../img/CodeLink_Guest_Icon.png";


export default function PostItem(props) {
    const {
        selected = false,
        comment = false,
        postId = null,
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
    const convertedText = stateToHTML(convertFromRaw(JSON.parse(text)));
    const { auth } = useSelector(state => state);
    const dispatch = useDispatch();


    const [ userLiked, setUserLiked ] = useState(
        likes && likes.some(({ user }) => user === auth.user._id)
    );


    const likeCurrentPost = () => {
        dispatch(likePost(_id));
        setUserLiked(!userLiked);
    };


    const deleteItem = () => {
        comment ?
        dispatch(deleteComment(postId, _id)) :
        dispatch(deletePost(_id));
    }


    return (
        <section className={`post ${selected ? `post--selected` : comment && `post--comment`}`}>


            <header className="post__header">

                <Link className="post__user" to={`/profile/${user}`}>
                    {
                        avatar.length > 0 ?
                        <img src={avatar} alt="avatar"/> :
                        <img src={guestIcon} alt="Guest Avatar" />
                    }
                    <p>
                        {name}
                    </p>
                </Link>

                <p className="post__date">
                    Posted on {formatDate(date, true)}
                </p>
                
            </header>


            <p className="post__text" dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(convertedText)}}></p>


            {
                !selected &&
                <aside className="post__actions">

                    {
                        !comment &&
                        <Fragment>

                            <button onClick={likeCurrentPost} className={`btn btn--tertiary post__likes ${ userLiked && `post__likes--active` }`}>
                                <i className="fas fa-thumbs-up" />
                                <span>
                                    {
                                        likes.length > 0 &&
                                        <sup className="post__likes-count">
                                            {likes.length}
                                        </sup>
                                    }
                                </span>
                            </button>

                            <Link to={`/posts/${_id}`} className="btn btn--tertiary post__discussion">
                                Comments
                                <span>
                                    {
                                        comments.length > 0 &&
                                        <sup className="post__comment-count">
                                            {comments.length}
                                        </sup>
                                    }
                                </span>
                            </Link>

                        </Fragment>
                    }

                    {
                        !auth.loading && user === auth.user._id &&
                        <button onClick={() => deleteItem()} type="button" className="btn btn--tertiary post__delete">
                            <i className="fas fa-times" />
                        </button>
                    }

                </aside>
            }

            
        </section>
    );
}