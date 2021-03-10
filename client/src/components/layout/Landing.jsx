import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
// LOCAL
import Register from "../auth/Register";
import Login from "../auth/Login";


export default function Landing() {
    const { isAuthenticated } = useSelector(state => state.auth);
    const [ landingElement, setLandingElement ] = useState("Login");

    if (isAuthenticated)
    return <Redirect to="/dashboard" />;


    return (
        <main className="landing">


            <section className="landing__inner">

                <h2 className="landing__inner-logo">
                    <sup><i className="fas fa-code"/></sup>
                    {" "}
                    Code<span>Link</span>
                </h2>

                <div className="landing__main">
                    {
                        landingElement === "Register" ?
                        <Register login={() => setLandingElement("Login")} /> :
                        <Login register={() => setLandingElement("Register")} />       
                    }
                </div>

            </section>


            <figure className="landing__hero"/>


        </main>
    );
}