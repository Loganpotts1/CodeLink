import React, { Fragment } from "react";
import { useDispatch } from "react-redux";
import Moment from "react-moment";
//  LOCAL
import { deleteEducation } from "../../actions/profile";
import formatDate from "../../utils/formatDate";


export default function Education(props) {
    const { education } = props;
    const dispatch = useDispatch();

    const educations = education.map(edu => (
        <tr key={edu._id}>
            
            <td>
                {edu.school}
            </td>

            <td className="hide-sm">
                {edu.degree}
            </td>

            <td>
                { formatDate(edu.from) + " - " + (edu.to ? formatDate(edu.to) : "Current") }
            </td>

            <td>
                <button className="education__delete-item" onClick={() => dispatch(deleteEducation(edu._id))}>
                    <i className="fas fa-backspace"></i>
                </button>
            </td>

        </tr>
    ));

    return (
        <div className="education">

            <h2 className="education__heading">
                Education
            </h2>

            <table className="education__table">
                <thead>
                    <tr>
                        <th>
                            School
                        </th>
                        <th className="hide-sm">
                            Degree
                        </th>
                        <th>
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

        </div>
    );
}