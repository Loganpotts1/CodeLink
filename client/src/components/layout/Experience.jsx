import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import Moment from "react-moment";


export default function Experience(props) {
    const state = useSelector(state => state);
    const { experience } = props;

    const experiences = experience.map(exp => (
        <tr key={exp.id}>

            <td>
                {exp.company}
            </td>

            <td className="hide-sm">
                {exp.title}
            </td>

            <td>
                <Moment format="YYYY/MM/DD">
                    {exp.from}
                </Moment> - {" " + exp.to ? 
                (<Moment format="YYYY/MM/DD">
                    {exp.to}
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
                Experience
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
                        <th>
                            {/* Column for Delete Buttons */}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {experiences}
                </tbody>
            </table>

        </Fragment>
    );
}