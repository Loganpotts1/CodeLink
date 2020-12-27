import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
//  LOCAL
import { logout } from "../../actions/auth";


export default function Navbar() {
    const dispatch = useDispatch();

    function dropDown() {
        const navItems = document.querySelector(".nav__links");
        navItems.classList.toggle("nav__links--active");
    }


    return (
        <nav className="nav">

            <div className="nav__logo">
                <Link to="/">
                    <i className="fas fa-code"/>
                </Link>
            </div>

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
                        {/* <i className="fas fa-user" />
                        {' '} */}
                        Dashboard
                    </Link>
                </li>

                <li>
                    <a onClick={() => dispatch(logout())} href="#!">
                        <i className="fas fa-sign-out-alt" />
                        {' '}
                        {/* <span className="hide-sm">
                            Logout
                        </span> */}
                    </a>
                </li>

            </ul>
            
            <button className="btn nav__hamburger" onClick={dropDown}>
                <i className="fas fa-bars"></i>
            </button>

        </nav>
    );
}