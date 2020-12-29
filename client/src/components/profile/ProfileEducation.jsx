import React from "react";
// LOCAL
import formatDate from "../../utils/formatDate";


export default function ProfileEducation(props) {
    const { education } = props.profile;


    return (
        <section className="profile__edu bg-white p-2">
            
            <h2 className="text-primary">
                Education
            </h2>

            {
                education.length ?
                education.map(edu => {
                    const {
                        _id,
                        school,
                        from,
                        current,
                        to,
                        degree,
                        fieldofstudy,
                        description
                    } = edu;

                    return (
                        <div key={_id}>
                            <h3 className="text-dark">
                                {school}
                            </h3>
                            <p>
                                {formatDate(from)} - {current ? "Current" : formatDate(to)}
                            </p>
                            <p>
                                <strong>Degree: </strong> {degree}
                            </p>
                            <p>
                                <strong>Field of Study: </strong> {fieldofstudy}
                            </p>
                            <p>
                                <strong>Description: </strong> {description}
                            </p>
                        </div>
                    );
                }) :
                <h4>
                    No Education
                </h4>
            }

        </section>
    );
}