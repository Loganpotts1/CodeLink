import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
//  LOCAL
import { getProfileById } from "../../actions/profile";
import Spinner from "../util/Spinner";
import ProfileTop from "./ProfileTop";
import ProfileAbout from "./ProfileAbout";
import ProfileExperience from "./ProfileExperience";
import ProfileEducation from "./ProfileEducation";

export default function Profile(props) {
    const { match: { params: { id } } } = props;
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
                        <div className="profile-exp bg-white p-2">
                            <h2 className="text-primary">
                                Experience
                            </h2>
                            {
                                profile.experience.length ?
                                profile.experience.map(exp => (
                                    <ProfileExperience key={exp._id} experience={exp} />
                                )) :
                                <h4>
                                    No Experience
                                </h4>
                            }
                        </div>
                        <div className="profile-edu bg-white p-2">
                            <h2 className="text-primary">
                                Education
                            </h2>
                            {
                                profile.education.length ?
                                profile.education.map(exp => (
                                    <ProfileEducation key={exp._id} education={exp} />
                                )) :
                                <h4>
                                    No Education
                                </h4>
                            }
                        </div>
                    </div>

                </Fragment>
            }
        </Fragment>
    );
}