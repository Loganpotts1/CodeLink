import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// LOCAL
import { register } from "../../actions/auth";
import Register from "../auth/Register";
import Login from "../auth/Login";


export default function Landing() {
    const { isAuthenticated } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const [landingElement, setLandingElement] = useState("Login");

    if (isAuthenticated)
    return <Redirect to="/dashboard" />;


    return (
        <section className="landing">


            <div className="landing__inner">

                <h2 className="codelink">
                    <i className="fas fa-code"/>
                    {" "}
                    Code<span>Link</span>
                </h2>
                
                <main className="landing__main">
                    {
                        landingElement === "Register" ?
                        <Register login={() => setLandingElement("Login")} />:
                        <Login register={() => setLandingElement("Register")} />       
                    }
                </main>

            </div>


            <div className="landing__hero"/>
            

        </section>
    );
}