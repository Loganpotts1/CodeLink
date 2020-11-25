import React from "react";
import { Link } from "react-router-dom";

export default function DashboardActions() {

    return (
        <div className='dash-buttons'>

            <Link to='/edit-profile' className='btn btn-dark'>
                <i className='fas fa-user-circle text-dark'/>
                {" "}
                <span className="hide-sm">
                    Edit Profile
                </span>
            </Link>

            <Link to='/add-experience' className='btn btn-dark'>
                <i className='fab fa-black-tie text-primary'/>
                {" "}
                <span className="hide-sm">
                    Add Experience
                </span>
            </Link>

            <Link to='/add-education' className='btn btn-dark'>
                <i className='fas fa-graduation-cap text-primary'/>
                {" "}
                <span className="hide-sm">
                    Add Education
                </span>
            </Link>

        </div>
    );
}