import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
//  LOCAL
import { logout } from "../../actions/auth";


export default function Navbar() {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const dispatch = useDispatch();


    const authLinks = (
        <ul className="nav__links">

            <li>
                <Link to="/profiles">
                    Developers
                </Link>
            </li>

            <li>
                <Link to="/posts">
                    Posts
                </Link>
            </li>

            <li>
                <Link to="/dashboard">
                    <i className="fas fa-user" />
                    {' '}
                    <span className="hide-sm">
                        Dashboard
                    </span>
                </Link>
            </li>

            <li>
                <a onClick={() => dispatch(logout())} href="#!">
                    <i className="fas fa-sign-out-alt" />
                    {' '}
                    <span className="hide-sm">
                        Logout
                    </span>
                </a>
            </li>

        </ul>
    );


    const guestLinks = (
        <ul className="nav__links">

            <li>
                <Link to="/profiles">
                    Developers
                </Link>
            </li>

            <li>
                <Link to="/register">
                    Register
                </Link>
            </li>

            <li>
                <Link to="/login">
                    Login
                </Link>
            </li>

        </ul>
    );


    return (
        <nav className="nav">

            <div className="nav__logo">
                <Link to="/">
                    <i className="fas fa-code"/>
                    {" CODELINK"}
                </Link>
            </div>

            {
                isAuthenticated ?
                authLinks : guestLinks
            }

        </nav>
    );
}