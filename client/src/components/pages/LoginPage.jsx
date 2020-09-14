import React, { Fragment } from 'react'
import Navbar from "../Navbar";
import Login from "../auth/Login";

export default function LoginPage() {
    return (
        <Fragment>
            <Navbar />
            <section className="container">
                <Login />
            </section>
        </Fragment>
    );
}
