import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
// LOCAL
import Register from "../auth/Register";
import Login from "../auth/Login";


export default function Landing() {
    const { isAuthenticated } = useSelector(state => state.auth);
    const [landingElement, setLandingElement] = useState("Login");

    if (isAuthenticated)
    return <Redirect to="/dashboard" />;


    return (
        <section className="landing">

            <div className="landing__inner">

                <h2 className="codelink">
                    <i className="fas fa-code"/>
                    {" "}
                    CodeLink
                </h2>
                
                <main className="landing__main">
                    {
                        landingElement === "Register" ?
                        <div className="landing__main--register">
                            <Register />
                        </div> :
                        <div className="landing__main--login">
                            <Login />
                        </div>          
                    }

                    <div className="line"/>

                    <a href="#!">
                        Alternatively,<br/> click here to sign in as a Guest
                    </a>
                </main>

            </div>

            <div className="landing__hero"/>
            
        </section>
    );
}