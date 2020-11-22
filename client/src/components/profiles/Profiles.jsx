import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
//  LOCAL
import { getAllProfiles } from "../../actions/profile";
import Spinner from "../utils/Spinner";
import ProfileItem from "./ProfileItem";

export default function Profiles() {
    const {
        profile: {
            profiles,
            loading
        }
    } = useSelector(state => state);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllProfiles());
        // eslint-disable-next-line
    },[]);

    return (
        <Fragment>
            {
                loading ?
                <Spinner/> :
                <Fragment>

                    <h1 className="large text-primary test">
                        Developers
                    </h1>

                    <p className="lead">
                        <i className="fab fa-connectdevelop"></i>
                        {" Browse and Connect with Developers"}
                    </p>

                    <div className="profiles">
                        {
                            profiles.map(profile => (
                                <ProfileItem key={profile._id} profile={profile} />
                            )) 
                        }
                    </div>

                </Fragment>
            }
        </Fragment>
    );
}