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
                <section className="profiles">

                    <h1 className="profiles__heading">
                        Developers
                    </h1>

                    <div className="profiles__container">
                        {
                            profiles.map(profile => (
                                <ProfileItem key={profile._id} profile={profile} />
                            )) 
                        }
                    </div>

                </section>
            }
        </Fragment>
    );
}