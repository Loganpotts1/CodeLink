import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
//  LOCAL
import formatDate from "../../utils/formatDate";
import { deleteExperience } from "../../actions/profile";


export default function Experience(props) {
    const { experience, id } = props;
    const {
        loading,
        user: {
            _id: userId
        }
    } = useSelector(state => state.auth);
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

            {
                !loading && id === userId &&
                <td className="table__delete-item">
                    <button className="btn btn--tertiary" onClick={() => dispatch(deleteExperience(exp._id))}>
                        <i className="fas fa-times"></i>
                    </button>
                </td>
            }

        </tr>
    ));


    return (
        <section className="table">


            <header className="table__header">
                <h2>
                    Experience
                </h2>

                {
                    !loading && id === userId &&
                    <Link to="/add-experience" className="btn btn--tertiary">
                        <i className="fas fa-plus"/>
                    </Link>
                }
                
            </header>
            

            {
                experience.length > 0 &&
                <table className="table__content">

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
                            {
                                !loading && id === userId &&
                                <th>
                                    {/* Column for Delete Buttons */}
                                </th>
                            }
                        </tr>
                    </thead>

                    <tbody>
                        {experiences}
                    </tbody>

                </table>
            }
            

        </section>
    );
}