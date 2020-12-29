import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
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
        <main className="profile">


            <button className="btn btn--return" onClick={() => {window.history.back()}}>
                <i className="fas fa-arrow-left"/>
            </button>


            {
                isAuthenticated &&
                user._id === profile.user._id &&
                <Link to="/edit-profile" className="btn btn--secondary">
                    Edit Profile
                </Link>
            }


            <div className="profile__grid">

                <ProfileTop profile={profile} />

                <ProfileAbout profile={profile} />

                <ProfileExperience profile={profile} />

                <ProfileEducation profile={profile} />

                {
                    profile.githubusername && <ProfileGithub username={profile.githubusername} />
                }
                
            </div>


        </main>
            
    );
}