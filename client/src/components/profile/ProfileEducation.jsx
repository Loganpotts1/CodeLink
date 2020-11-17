import React from "react";
// LOCAL
import formatDate from "../../utils/formatDate";


export default function ProfileEducation(props) {
    const {
        education: {
            school,
            degree,
            fieldofstudy,
            current,
            to,
            from,
            description
        }
    } = props;

    return (
        <div>
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
}