import React, { useState } from "react";
import { useDispatch } from "react-redux";
// LOCAL
import { createPost } from "../../actions/post";


export default function PostForm() {
    const dispatch = useDispatch();
    const [text, setText] = useState("");

    const onSubmit = event => {
        dispatch(createPost({ text }));
        setText("");
        event.preventDefault();
    }

    return (
        <form className="form">

            <header className='bg-primary p'>
                <h3>
                    Join the Conversation!
                </h3>
            </header>

            <div className="form__group" onSubmit={event => onSubmit(event)}>
                <textarea
                    name='text'
                    cols='30'
                    rows='1'
                    placeholder='Create a post'
                    value={text}
                    onChange={event => setText(event.target.value)}
                    required
                />
            </div>

            <div className="form__group">
                <input type='submit' className='btn btn--primary form__submit form__submit--right' value='Submit' />
            </div>

        </form>
    );
}