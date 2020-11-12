import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
//  LOCAL
import { getProfileById } from "../../actions/profile";
import Spinner from "../util/Spinner";
import ProfileTop from "./ProfileTop";
import ProfileAbout from "./ProfileAbout";

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
        auth: {
            isAuthenticated,
            user
        },
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
                    <Link to="/profiles" className="btn btn-light">
                        Back to Developers
                    </Link>
                    {
                        isAuthenticated &&
                        user._id === profile.user._id &&
                        <Link to="/edit-profile" className="btn btn-dark">
                            Edit Profile
                        </Link>
                    }
                    <div className="profile-grid my-1">
                        <ProfileTop profile={profile} />
                        <ProfileAbout profile={profile} />
                    </div>
                </Fragment>
            }
        </Fragment>
    );
}