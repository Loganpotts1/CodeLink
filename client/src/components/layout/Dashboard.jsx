import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";


export default function Dashboard() {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    if (!isAuthenticated)
    return <Redirect to="/login" />;


    return (
        <Fragment>
            <h1>
                Dashboard
            </h1>
        </Fragment>
    );
}