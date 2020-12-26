import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
//  LOCAL
import { getCurrentProfile } from "../../actions/profile";
import { deleteAccount } from "../../actions/auth";
import Experience from "./Experience";
import Education from "./Education";


export default function Dashboard() {
    const dispatch = useDispatch();
    const state = useSelector(state => state);
    const {
        auth: {
            user
        },
        profile: {
            profile,
            loading
        }
    } = state;


    useEffect(() => {
        dispatch(getCurrentProfile());
    }, [dispatch]);

    return (
        <div className="dashboard">

            <div className="dashboard__welcome">
                <h1 className="dashboard__heading">
                    Dashboard
                </h1>
                <h3>
                    {`Welcome ${profile ? "back, " : ""} ${user && user.name.trim().split(" ")[0]}!`}
                </h3>
            </div>
            

            {
                profile && (!loading) ? 
                
                <Fragment>
                    <Experience />
                    <Education />
                    <div className="dashboard__actions">
                        <Link className="btn btn--secondary" to="/edit-profile">
                            Edit Profile
                        </Link>
                        <button className="btn btn--tertiary dashboard__delete-account" onClick={() => dispatch(deleteAccount())}>
                            Delete Account
                        </button>
                    </div>
                </Fragment> :
                
                <div className="dashboard--new">
                    <h2>
                        Why not set up a profile?
                    </h2>
                    <Link className="btn btn--primary" to="/edit-profile">
                        Create Profile
                    </Link>
                </div>
                
            }


        </div>
    );
}