import React, { Fragment } from "react"
import { Link, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
//  LOCAL
import { register } from "../../actions/auth";
import { setAlert } from "../../actions/alert";


export default function Register(props) {
    const { login } = props;
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
        <section className="login">


            <h1 className="login__heading">
                Create an Account
            </h1>


            <form className="form" onSubmit={onSubmit}>

                <div className="form__group">
                    <input 
                        type="text" 
                        placeholder="Name" 
                        name="name" 
                        value={name} 
                        onChange={onChange} 
                        required 
                    />
                </div>

                <div className="form__group">
                    <input 
                        type="email" 
                        placeholder="Email Address" 
                        name="email" 
                        value={email} 
                        onChange={onChange}
                    />
                    <small className="form__text">
                        <i className="fa fa-info-circle"/> This site uses Gravatar. If you want a profile image, use a
                        Gravatar email
                    </small>
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

                <div className="form__group">
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        name="password2"
                        value={password2}
                        minLength="6"
                        onChange={onChange}
                    />
                </div>

                <button type="submit" className="form__submit btn btn--login" onChange={onChange}>
                    Submit <i className="fa fa-chevron-right"/>
                </button>

            </form>


            <p className="login__switch">
                Already have an account? 
                <a href="#!" onClick={login}>
                    {" Sign In"}
                </a>
            </p>


        </section>
    );
}