import React, { Fragment } from "react";
import { useSelector } from "react-redux";


export default function Experience() {
    const state = useSelector(state => state);
    const { experience } = state.profile.profile;

    return (
        <Fragment>

            <h2 className="my-2">
                Experience Credentials
            </h2>

            <table className="table">
                <thead>
                    <tr>
                        <th>
                            Company
                        </th>
                        <th className="hide-sm">
                            Title
                        </th>
                        <th className="hide-sm">
                            Years
                        </th>
                    </tr>
                </thead> 
            </table>

        </Fragment>
    );
}