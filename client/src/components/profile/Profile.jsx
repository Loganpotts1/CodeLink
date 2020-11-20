import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
//  LOCAL
import { getProfileById } from "../../actions/profile";
import Spinner from "../utils/Spinner";
import ProfileTop from "./ProfileTop";
import ProfileAbout from "./ProfileAbout";
import ProfileExperience from "./ProfileExperience";
import ProfileEducation from "./ProfileEducation";
import ProfileGithub from "./ProfileGithub";


export default function Profile(props) {
    const { id } = props.match.params;
    const {
        auth: {
            isAuthenticated,
            user
        },
        profile: {
            profile,
            loading
        }
    } = useSelector(state => state);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProfileById(id));
        // eslint-disable-next-line
    },[]);

    return (
        
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


            <div className="profile__grid my-1">

                <ProfileTop profile={profile} />

                <ProfileAbout profile={profile} />

                <div className="profile__exp bg-white p-2">
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

                <div className="profile__edu bg-white p-2">
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

                {
                    profile.githubusername && <ProfileGithub username={profile.githubusername} />
                }
                
            </div>


        </Fragment>
            
    );
}