import React from "react";
import { Link, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Landing() {
    const { isAuthenticated } = useSelector(state => state.auth);

    if (isAuthenticated)
    return <Redirect to="/dashboard" />;


    return (
        <section className="landing">



            <div className="dark-overlay">


                <div className="landing__inner">

                    <h1 className="x-large">
                        CODELINK
                    </h1>

                    <p className="lead">
                        Create a developer profile/portfolio, share posts and get help from
                        other developers
                    </p>

                    <div className="buttons">
                        <Link to="/register" className="btn btn-primary">
                            Sign Up
                        </Link>
                        <Link to="/login" className="btn btn-light">
                            Login
                        </Link>
                    </div>
                    
                </div>


            </div>



      </section>
    );
}