import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { Link } from "react-router-dom";
//  LOCAL
import { getProfileById } from "../../actions/profile";
import Spinner from "../utils/Spinner";
import User from "../profile/User";
import Experience from "../profile/Experience";
import Education from "../profile/Education";
import Github from "../profile/Github";


export default function Profile(props) {
    const { id } = props.match.params;
    const {
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

            <User profile={profile} />

            { profile.experience.length > 0 && <Experience experience={profile.experience} id={profile.user._id} /> }
            
            { profile.education.length > 0 && <Education education={profile.education} id={profile.user._id} /> }

            {
                profile.githubusername &&
                <Fragment>
                    <div className="line"></div>
                    <Github username={profile.githubusername} />
                </Fragment>
            }

        </main>;
}