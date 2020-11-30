import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
// LOCAL
import Register from "../auth/Register";
import Login from "../auth/Login";


export default function Landing() {
    const { isAuthenticated } = useSelector(state => state.auth);
    const [landingElement, setLandingElement] = useState("default");

    if (isAuthenticated)
    return <Redirect to="/dashboard" />;


    return (
        <section className="landing">

            <div className="landing__inner">
                {
                    landingElement === "Register" ?
                    <Register /> :
                    landingElement === "Login" ?
                    <Login /> :
                    <Fragment>
                        <h1 className="x-large">
                            CODELINK
                        </h1>

                        <p className="lead">
                            Create a developer profile/portfolio, share posts and get help from
                            other developers
                        </p>

                        <div className="buttons">
                            <button onClick={() => setLandingElement("Register")}>
                                Sign Up
                            </button>
                            <button onClick={() => setLandingElement("Login")}>
                                Login
                            </button>
                        </div>
                    </Fragment>
                }
            </div>

            <div className="landing__hero"/>
            
        </section>
    );
}