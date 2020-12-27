import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
//  LOCAL
import { deleteEducation } from "../../actions/profile";
import formatDate from "../../utils/formatDate";


export default function Education() {
    const { education } = useSelector(state => state.profile.profile);
    const dispatch = useDispatch();

    const educations = education.map(edu => (
        <tr key={edu._id}>
            
            <td className="hide--sm">
                {edu.school}
            </td>

            <td>
                {edu.degree}
            </td>

            <td>
                { formatDate(edu.from) + " - " + (edu.to ? formatDate(edu.to) : "Current") }
            </td>

            <td>
                <button className="education__delete-item" onClick={() => dispatch(deleteEducation(edu._id))}>
                    <i className="fas fa-minus"></i>
                </button>
            </td>

        </tr>
    ));

    return (
        <div className="education">


            <div className="education__heading">
                <h2>
                    Education
                </h2>

                <Link to="/add-education">
                    <i className="fas fa-plus"/>
                </Link>
            </div>


            {
                education.length > 0 &&
                <table className="education__table">

                    <thead>
                        <tr>
                            <th className="hide--sm">
                                School
                            </th>
                            <th>
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
            }
            

        </div>
    );
}