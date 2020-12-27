import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
//  LOCAL
import formatDate from "../../utils/formatDate";
import { deleteExperience } from "../../actions/profile";


export default function Experience() {
    const { experience } = useSelector(state => state.profile.profile);
    const dispatch = useDispatch();

    const experiences = experience.map(exp => (
        <tr key={exp._id}>

            <td className="hide--sm">
                {exp.company}
            </td>

            <td>
                {exp.title}
            </td>

            <td>
                { formatDate(exp.from) + " - " + (exp.to ? formatDate(exp.to) : "Current") }
            </td>

            <td>
                <button className="experience__delete-item" onClick={() => dispatch(deleteExperience(exp._id))}>
                    <i className="fas fa-minus"></i>
                </button>
            </td>

        </tr>
    ));


    return (
        <div className="experience">


            <div className="experience__heading">
                <h2>
                    Experience
                </h2>

                <Link to="/add-experience">
                    <i className="fas fa-plus"/>
                </Link>
            </div>
            

            {
                experience.length > 0 &&
                <table className="experience__table">

                    <thead>
                        <tr>
                            <th className="hide--sm">
                                Company
                            </th>
                            <th>
                                Title
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
                        {experiences}
                    </tbody>

                </table>
            }
            

        </div>
    );
}