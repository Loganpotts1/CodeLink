import React from "react";
// LOCAL
import formatDate from "../../utils/formatDate";


export default function ProfileExperience(props) {
    const { experience } = props.profile;


    return (
        <section className="profile-professional">

            <h2 className="profile-professional__heading">
                Experience
            </h2>

            {
                experience.length ?
                experience.map(exp => {
                    const {
                        _id,
                        company,
                        title,
                        location,
                        current,
                        to,
                        from,
                        description
                    } = exp;
            
                    return (
                        <div key={_id} className="profile-professional__item">
                            <h3>
                                {company}
                            </h3>
                            <p>
                                {formatDate(from)} - {current ? "Current" : formatDate(to)}
                            </p>
                            <p>
                                <strong>Position: </strong> {title}
                            </p>
                            <p>
                                <strong>Location: </strong> {location}
                            </p>
                            <p>
                                <strong>Description: </strong> {description}
                            </p>
                        </div>
                    );
                }) :
                <h4>
                    No Experience
                </h4>
            }

        </section>
    );
}