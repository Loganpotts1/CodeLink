import React from "react";
import { Link } from "react-router-dom";

export default function DashboardActions() {

    return (
        <div className='dash-buttons'>

            <Link to='/create-profile' className='btn btn-light'>
                <i className='fas fa-user-circle text-primary'/>
                {` Edit Profile`}
            </Link>

            <Link to='/add-education' className='btn btn-light'>
                <i className='fas fa-graduation-cap text-primary'/>
                {` Add Education`}
            </Link>

            <Link to='/add-experience' className='btn btn-light'>
                <i className='fab fa-black-tie text-primary'/>
                {` Add Experience`}
            </Link>

        </div>
    );
}