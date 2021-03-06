import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
//  LOCAL
import { login } from "../../actions/auth";
import Spinner from "../utils/Spinner";


export default function Login(props) {
    const { register } = props;
    const { isAuthenticated } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    let [ isSubmitting, setIsSubmitting ] = useState(false);
    
    const [ formData, setFormData ] = useState({
        email: "angela@gmail.com",
        password: "123456",
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
        setIsSubmitting(true);
        
        dispatch(login({
            email,
            password
        }));
    };


    return(
        <section className="login">


            <h1 className="login__heading">
                Log Into Your Account
            </h1>


            <form className="form" onSubmit={onSubmit}>

                <div className="form__group">
                    <input 
                        type="email" 
                        placeholder="Email Address" 
                        name="email" 
                        value={email} 
                        onChange={onChange}
                    />
                </div>

                <div className="form__group">
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={password}
                        minLength="6"
                        onChange={onChange}
                    />
                </div>

                <div className="form__submit form__submit--center">
                    <button type="submit" className="btn btn--login" onChange={onChange}>
                        <span>Login</span> {
                            isSubmitting ?
                            <Spinner width="1.1rem"/> :
                            <i className="fa fa-chevron-right"/>
                        }
                    </button>
                </div>

                

            </form>

            
            <div className="line"></div>


            <p className="login__switch">
                Don't have an account?
                <a href="#" onClick={register}>
                    {" Sign Up"}
                </a>
            </p>


        </section>
    );
};