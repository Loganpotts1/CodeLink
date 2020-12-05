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

    const loginGuest = () => {
        dispatch(register({
            name: "Guest",
            email: `guest${Math.floor(Math.random() * 10000)}@gmail.com`,
            password: "123456"
        }));
    }


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

                    <div className="line"/>

                    <a className="guest" href="#!" onClick={loginGuest}>
                        Alternatively,<br/> click here to sign in as a <span>Guest</span>
                    </a>

                </main>

            </div>

            <div className="landing__hero"/>
            
        </section>
    );
}