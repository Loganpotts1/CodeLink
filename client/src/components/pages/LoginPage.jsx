import React, { Fragment } from 'react'
import axios from 'axios';
import { Link } from "react-router-dom";

import Navbar from "../Navbar";

    
export default function LoginPage() {
    const [formData, setFormData] = React.useState({
        email: "",
        password: "",
    });
    const {
        email, 
        password
    } = formData;

    const onChange = event => setFormData({
        ...formData, [event.target.name]: event.target.value 
    });

    const onSubmit = async event => {
        event.preventDefault();
        console.log("Success");
    }


    return (
        <Fragment>


            <Navbar />


            <section className="container">

                <h1 className="large text-primary">
                    Sign In
                </h1>

                <p className="lead">
                    <i className="fas fa-user"></i>
                    Log Into Your Account
                </p>

                <form className="form" onSubmit={onSubmit}>
                <div className="form-group">
                        <input 
                            type="email" 
                            placeholder="Email Address" 
                            name="email" 
                            value={email} 
                            onChange={onChange}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={password}
                            minLength="6"
                            onChange={onChange}
                        />
                    </div>
                    <input 
                        type="submit" 
                        className="btn btn-primary" 
                        value="Login" 
                        onChange={onChange} 
                    />
                </form>

                <p className="my-1">
                    Don't have an account? 
                    <Link to="/register">
                        Sign Up
                    </Link>
                </p>

            </section>


        </Fragment>
    );
}
