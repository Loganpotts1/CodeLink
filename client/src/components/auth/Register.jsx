import React, { Fragment } from "react"
import { Link, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
//  LOCAL
import { register } from "../../actions/auth";
import { setAlert } from "../../actions/alert";


export default function Register() {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const dispatch = useDispatch();
    const [formData, setFormData] = React.useState({
        name: "",
        email: "",
        password: "",
        password2: ""
    });
    const {
        name,
        email,
        password,
        password2
    } = formData;


    //  Check to see if user is already logged in, then redirect to /dashboard
    if (isAuthenticated)
    return <Redirect to="/dashboard" />;


    const onChange = event => setFormData({
        ...formData, [event.target.name]: event.target.value 
    });


    const onSubmit = async event => {
        event.preventDefault();

        if (password !== password2) {

            dispatch(setAlert("Passwords do not match", "danger"));

        } else {

            dispatch(register({
                name,
                email, 
                password 
            }));

        }
    }


    return (
        <Fragment>


            <h1 className="large text-primary">
                Sign Up
            </h1>


            <p className="lead">
                <i className="fas fa-user"></i>
                {" Create Your Account"}
            </p>


            <form className="form" onSubmit={onSubmit}>

                <div className="form-group">
                    <input 
                        type="text" 
                        placeholder="Name" 
                        name="name" 
                        value={name} 
                        onChange={onChange} 
                        required 
                    />
                </div>

                <div className="form-group">
                    <input 
                        type="email" 
                        placeholder="Email Address" 
                        name="email" 
                        value={email} 
                        onChange={onChange}
                    />
                    <small className="form-text"
                        >This site uses Gravatar so if you want a profile image, use a
                        Gravatar email
                    </small>
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

                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        name="password2"
                        value={password2}
                        minLength="6"
                        onChange={onChange}
                    />
                </div>

                <input 
                    type="submit" 
                    className="btn btn-primary" 
                    value="Register" 
                    onChange={onChange} 
                />

            </form>


            <p className="my-1">
                Already have an account? 

                <Link to="/login">
                    {" Sign In"}
                </Link>
                
            </p>


        </Fragment>
    );
}