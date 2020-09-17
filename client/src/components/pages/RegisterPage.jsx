import React, { Fragment } from 'react'

import Navbar from "../Navbar";
import Register from "../auth/Register";


export default function RegisterPage() {

    return (
        <Fragment>

            <Navbar />

            <section className="container">
                <Register />
            </section>

        </Fragment>
    );
}
