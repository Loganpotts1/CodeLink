import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
//  LOCAL
import { getCurrentProfile } from "../../actions/profile";


export default function Dashboard() {
    const dispatch = useDispatch();
    const state = useSelector(state => state);
    const { user } = state.auth;
    const { profile } = state.profile;


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
                {` Welcome ${user && user.name}`}
            </p>

            {
                profile !== null ? 
                (
                    <Fragment>
                        <div className="my-2">
                            <button className="btn btn-danger">
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
                        <Link to="/create-profile" className="btn btn-primary my-1">
                            Create Profile
                        </Link>
                    </Fragment>
                )
            }

        </Fragment>
    );
}