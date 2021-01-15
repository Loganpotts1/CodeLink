import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { ContentState, convertToRaw, convertFromRaw, EditorState } from "draft-js";
import Editor from "@draft-js-plugins/editor";
// import { convertToHTML } from "draft-convert";
// import { Editor } from "react-draft-wysiwyg";
// import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
// LOCAL
import { createComment, createPost } from "../../actions/post";


export default function PostForm(props) {
    const { selected = false, postId } = props;
    const dispatch = useDispatch();

    // draft-js and react-draft setup
    // let _contentState = ContentState.createFromText("some content");
    // const raw = convertToRaw(_contentState);
    const [ text, setText ] = useState(EditorState.createEmpty());
    // const [ convertedText, setConvertedText ] = useState(null);


    // const editorOnChange = state => {
    //     setText(state);
    //     const jsonConverted = convertFromRaw(text);
    //     setConvertedText(jsonConverted);
    //     console.log(typeof convertedText);
    // }

    
    const onSubmit = event => {
        console.log(text);

        selected ? 
        dispatch(createComment(postId, { text })) :
        dispatch(createPost({ text }));

        setText(EditorState.createEmpty());
        event.preventDefault();
    }


    return (
        <form className="form" onSubmit={event => onSubmit(event)}>

        <Editor editorState={text} onChange={state => setText(state)} plugins={[]} placeholder="type here..." className="editor" />
            <div className="form__group">
                {/* <textarea
                    name='text'
                    cols='30'
                    rows='1'
                    placeholder={ selected ? "Leave a Comment!" : "Join the Conversation!" }
                    value={text}
                    onChange={event => setText(event.target.value)}
                    required
                /> */}

                {/* <Editor
                    defaultContentState={text}
                    onContentStateChange={() => editorOnChange()}
                    wrapperClassName="draft"
                    toolbarClassName="draft__toolbar"
                    editorClassName="draft__editor"
                /> */}

                
            </div>

            <div className="form__group">
                <input type='submit' className='btn btn--primary form__submit form__submit--right' value='Submit' />
            </div>

        </form>
    );
}