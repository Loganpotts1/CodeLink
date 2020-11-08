import React, { Fragment } from "react";
import { useSelector } from "react-redux";


export default function Education() {
    const state = useSelector(state => state);
    const { experience } = state.profile.profile;

    return (
        <Fragment>

        </Fragment>
    );
}