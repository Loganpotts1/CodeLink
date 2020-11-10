import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
//  LOCAL
import { getAllProfiles } from "../../actions/profile";
import Spinner from "../util/Spinner";
import ProfileItem from "./ProfileItem";

export default function Profiles(props) {
    const { profiles, loading } = useSelector(state => state.profile);
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

                    <h1 className="large text-primary">
                        Developers
                    </h1>

                    <p className="lead">
                        <i className="fab fa-connectdevelop"></i>
                        {" Browse and Connect with Developers"}
                    </p>

                    <div className="profiles">
                        {
                            profiles ?
                            profiles.map(profile => (
                                <ProfileItem key={profile._id} profile={profile} />
                            )) :
                            <h4>
                                No Profiles Found :(
                            </h4>
                        }
                    </div>

                </Fragment>
            }
        </Fragment>
    );
}