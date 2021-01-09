import React from "react";
import { Link } from "react-router-dom";


export default function ProfileItem(props) {
    const {
        profile: {
            user: {
                _id,
                name
            },
            avatar,
            status,
            company,
            location,
            skills
        }
    } = props;

    return (
        <section className="card">

            <figure className="card__avatar">
                {
                    avatar.length > 0 ?
                    <img src={avatar} alt="avatar"/> :
                    <i className="fas fa-user-ninja"/>
                }
            </figure>

            <div className="card__content">
                <h2 className="card__name">
                    {name}
                </h2>

                <Link to={`/profile/${_id}`} className="btn btn--tertiary card__button">
                    View Profile
                </Link>

                <aside className="card__details">
                    <small className="card__company">
                        {status} {company && <span> at {company}</span>}
                    </small>

                    <small  className="card__location">
                        {location && <span>{location}</span>}
                    </small>
                </aside>

                <ul className="card__skills">
                    {skills.slice(0,4).map((skill, index) => (
                        <li key={index}>
                            {/* <i className="fas fa-check"></i> */}
                            {" " + skill}
                        </li>
                    ))}
                </ul>
            </div>

        </section>
    );
}