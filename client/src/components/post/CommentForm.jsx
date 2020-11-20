import React, { useState } from "react";
import { useDispatch } from "react-redux";
// LOCAL
import { createComment } from "../../actions/post";


export default function CommentForm(props) {
    const { postId } = props;
    const dispatch = useDispatch();
    const [text, setText] = useState("");

    const onSubmit = event => {
        dispatch(createComment(postId, { text }));
        setText("");
        event.preventDefault();
    }

    return (
        <div className='post__form'>

            <div className='bg-primary p'>
                <h3>
                    Leave a Comment
                </h3>
            </div>

            <form className='form my-1' onSubmit={event => onSubmit(event)}>
                <textarea
                    name='text'
                    cols='30'
                    rows='5'
                    placeholder='Great post!'
                    value={text}
                    onChange={event => setText(event.target.value)}
                    required
                />
                <input type='submit' className='btn btn-dark my-1' value='Submit' />
            </form>

        </div>
    );
}