import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
//  LOCAL
import { getProfileById } from "../../actions/profile";
import Spinner from "../util/Spinner";

export default function Profile(props) {
    const {
        match: {
            params: {
                id
            }
        }
    } = props;
    const dispatch = useDispatch();
    const state = useSelector(state => state);
    const {
        profile: {
            profile,
            loading
        }
    } = state;

    useEffect(() => {
        dispatch(getProfileById(id));
        // eslint-disable-next-line
    },[]);

    return (
        <Fragment>
            {
                (!profile) || loading ?
                <Spinner /> :
                <Fragment>
                    Profile
                </Fragment>
            }
        </Fragment>
    );
}