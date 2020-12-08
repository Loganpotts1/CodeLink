import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
//  LOCAL
import { getCurrentProfile } from "../../actions/profile";
import { deleteAccount } from "../../actions/auth";
import DashboardActions from "./DashboardActions";
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
                    {`Welcome ${profile && "back, "} ${user && user.name.trim().split(" ")[0]}!`}
                </h3>
            </div>
            

            {
                profile && (!loading) ? 
                (
                    <Fragment>
                            
                            <DashboardActions/>
                        {profile.experience.length > 0 && <Experience experience={profile.experience} />}
                        {profile.education.length > 0 && <Education education={profile.education} />}
                        <button className="dashboard__delete-account" onClick={() => dispatch(deleteAccount())}>
                            <i className="fas fa-user-minus" />
                            {" Delete My Account"}
                        </button>
                    </Fragment>
                ) : 
                (
                    <Fragment>
                        <div className="dashboard__welcome">
                            <h3>
                                {`Welcome ${user && user.name.trim().split(" ")[0]}!`}
                            </h3>
                            <p className="dashboard__welcome dashboard__welcome--new">
                                Why not set up a profile?
                            </p>
                            <Link to="/edit-profile">
                                Create Profile
                            </Link>
                        </div>
                    </Fragment>
                )
            }

        </div>
    );
}