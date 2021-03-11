import React from "react";
import { Link } from "react-router-dom";
// LOCAL
import guestIcon from "../../img/CodeLink_Guest_Icon.png";

export default function ProfileItem(props) {
    let {
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

    if (company && company.length > 8) {
        company = company.slice(0,8).concat("...");
    }


    return (
        <section className="card">


            <figure className="card__avatar">
                {
                    avatar.length > 0 ?
                    <img src={avatar} alt="avatar"/> :
                    <img src={guestIcon} alt="guest-avatar" />
                    // <i className="fas fa-user-ninja"/>
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
                    {skills.slice(0,3).map((skill, index) => {
                        if (skill.length > 6) {
                            skill = skill.slice(0, 6).concat("...");
                        }

                        return (
                            <li key={index}>
                                {" " + skill}
                            </li>
                        );
                    })}
                </ul>
                
            </div>

        </section>
    );
}