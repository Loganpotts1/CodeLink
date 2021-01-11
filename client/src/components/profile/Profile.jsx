import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
//  LOCAL
import { getProfileById } from "../../actions/profile";
import Spinner from "../utils/Spinner";
import ProfileTop from "./ProfileTop";
import Experience from "../layout/Experience";
import Education from "../layout/Education";
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


    return !profile || loading ?
        <Spinner /> :
        <main className="profile">


            <button className="btn btn--return" onClick={() => {window.history.back()}}>
                <i className="fas fa-arrow-left"/>
            </button>


            {/* {
                isAuthenticated &&
                user._id === profile.user._id &&
                <Link to="/edit-profile" className="btn btn--secondary">
                    Edit Profile
                </Link>
            } */}

            <ProfileTop profile={profile} />

            {
                profile.bio && 
                <div className="profile__bio">
                    <h2>
                        {profile.user.name.trim().split(' ')[0]}'s Bio
                    </h2>
                    <p>{profile.bio}</p>
                </div>
            }

            <div className="line" />

            <div className="profile__skills">
                {profile.skills.map((skill, index) => (
                    <span key={index}>
                        {" " + skill}
                    </span>
                ))}
            </div>

            { profile.experience.length > 0 && <Experience experience={profile.experience} id={profile.user._id} /> }
            
            { profile.education.length > 0 && <Education education={profile.education} id={profile.user._id} /> }

            {
                profile.githubusername &&
                <Fragment>
                    <div className="line"></div>
                    <ProfileGithub username={profile.githubusername} />
                </Fragment>
            }

        </main>;
}