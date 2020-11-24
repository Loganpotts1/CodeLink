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
        <Fragment>

            <h1 className="large text-primary">
                Dashboard
            </h1>

            <p className="lead">
                <i className="fas fa-user" />
                {` Welcome ${user && user.name.trim().split(" ")[0]}`}
            </p>

            {
                profile && (!loading) ? 
                (
                    <Fragment>
                        <DashboardActions/>
                        {profile.experience.length > 0 && <Experience experience={profile.experience} />}
                        {profile.education.length > 0 && <Education education={profile.education} />}
                        <div className="my-2 account-delete">
                            <button className="btn btn-danger" onClick={() => dispatch(deleteAccount())}>
                                <i className="fas fa-user-minus" />
                                {" Delete My Account"}
                            </button>
                        </div>
                    </Fragment>
                ) : 
                (
                    <Fragment>
                        <p>
                            Why not set up a profile?
                        </p>
                        <Link to="/edit-profile" className="btn btn-primary my-1">
                            Create Profile
                        </Link>
                    </Fragment>
                )
            }

        </Fragment>
    );
}