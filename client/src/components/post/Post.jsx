import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
// LOCAL
import { getPost } from "../../actions/post";


export default function Post(props) {
    const { id } = props.match.params
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPost(id));
        // eslint-disable-next-line
    }, []);

    return (
        <div className="">
            MEME
        </div>
    );
}