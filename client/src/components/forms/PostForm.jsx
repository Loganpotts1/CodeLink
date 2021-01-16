import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { convertToRaw, EditorState } from "draft-js";
import Editor from "@draft-js-plugins/editor";
import createLinkPlugin from '@draft-js-plugins/anchor';
import createInlineToolbarPlugin from '@draft-js-plugins/inline-toolbar';
import {
  ItalicButton,
  BoldButton,
  UnderlineButton,
} from '@draft-js-plugins/buttons';
import '@draft-js-plugins/inline-toolbar/lib/plugin.css';
import "@draft-js-plugins/anchor/lib/plugin.css";
// LOCAL
import { createComment, createPost } from "../../actions/post";
import { Fragment } from "react";


//  Editor Plugin Setup
const linkPlugin = createLinkPlugin();
const inlineToolbarPlugin = createInlineToolbarPlugin();
const { InlineToolbar } = inlineToolbarPlugin;
const plugins = [inlineToolbarPlugin, linkPlugin];


export default function PostForm(props) {
    const { selected = false, postId } = props;
    const dispatch = useDispatch();
    const [ editorState, setEditorState ] = useState(EditorState.createEmpty());

    
    const onSubmit = event => {
        const text = JSON.stringify(convertToRaw(editorState.getCurrentContent()));

        selected ? 
        dispatch(createComment(postId, { text })) :
        dispatch(createPost({ text }));

        setEditorState(EditorState.createEmpty());
        event.preventDefault();
    }


    return (
        <form className="form" onSubmit={event => onSubmit(event)}>

        
            <div className="form__group">
                <Editor 
                    editorState={editorState} 
                    onChange={state => setEditorState(state)} 
                    plugins={plugins} placeholder="type here..." 
                />
                <InlineToolbar>
                    {
                        (externalProps) => <Fragment>
                            <BoldButton {...externalProps} />
                            <ItalicButton {...externalProps} />
                            <UnderlineButton {...externalProps} />
                            <linkPlugin.LinkButton {...externalProps} />
                        </Fragment>
                    }
                </InlineToolbar>
            </div>

            <div className="form__group">
                <input type='submit' className='btn btn--primary form__submit form__submit--right' value='Submit' />
            </div>

        </form>
    );
}