import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";

import { login } from "../../actions/auth";
import Alert from "../Alert";

export default function Login() {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const dispatch = useDispatch();
    const [formData, setFormData] = React.useState({
        email: "",
        password: "",
    });
    const {
        email, 
        password
    } = formData;


    //  Check to see if user is already logged in, then redirect to /dashboard
    if (isAuthenticated)
    return <Redirect to="/dashboard" />;


    const onChange = event => setFormData({
        ...formData, [event.target.name]: event.target.value 
    });

    
    const onSubmit = async event => {
        event.preventDefault();
        
        dispatch(login({
            email,
            password
        }));
    };


    return(
        <Fragment>


            <Alert />


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


        </Fragment>
    );
};