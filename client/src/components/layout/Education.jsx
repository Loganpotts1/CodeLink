import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import Moment from "react-moment";


export default function Education(props) {
    const state = useSelector(state => state);
    const { education } = props;

    const educations = education.map(edu => (
        <tr key={edu.id}>

            <td>
                {edu.school}
            </td>

            <td className="hide-sm">
                {edu.degree}
            </td>

            <td>
                <Moment format="YYYY/MM/DD">
                    {edu.from}
                </Moment> - {" " + edu.to ? 
                (<Moment format="YYYY/MM/DD">
                    {edu.to}
                </Moment>) :
                ("Current") }
            </td>

            <td>
                <button className="btn btn-danger">
                    Delete
                </button>
            </td>

        </tr>
    ));

    return (
        <Fragment>

            <h2 className="my-2">
                Education
            </h2>

            <table className="table">
                <thead>
                    <tr>
                        <th>
                            School
                        </th>
                        <th className="hide-sm">
                            Degree
                        </th>
                        <th className="hide-sm">
                            Years
                        </th>
                        <th>
                            {/* Column for Delete Buttons */}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {educations}
                </tbody>
            </table>

        </Fragment>
    );
}