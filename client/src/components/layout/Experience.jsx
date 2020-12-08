import React, { Fragment } from "react";
import { useDispatch } from "react-redux";
import Moment from "react-moment";
//  LOCAL
import { deleteExperience } from "../../actions/profile";


export default function Experience(props) {
    const { experience } = props;
    const dispatch = useDispatch();

    const experiences = experience.map(exp => (
        <tr key={exp._id}>

            <td>
                {exp.company}
            </td>

            <td className="hide-sm">
                {exp.title}
            </td>

            <td>
                <Moment format="YYYY/MM/DD">
                    {exp.from}
                </Moment> {"- "}{exp.to ? 
                (<Moment format="YYYY/MM/DD">
                    {exp.to}
                </Moment>) :
                ("Current") }
            </td>

            <td>
                <button className="experience__delete-item" onClick={() => dispatch(deleteExperience(exp._id))}>
                    <i className="fas fa-backspace"></i>
                </button>
            </td>

        </tr>
    ));


    return (
        <div className="experience">


            <h2 className="experience__heading">
                Experience
            </h2>


            <table className="experience__table">

                <thead>
                    <tr>
                        <th>
                            Company
                        </th>
                        <th className="hide-sm">
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


        </div>
    );
}