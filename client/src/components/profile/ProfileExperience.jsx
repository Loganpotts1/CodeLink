import React from "react";
// LOCAL
import formatDate from "../../utils/formatDate";


export default function ProfileExperience(props) {
    const {
        experience: {
            company,
            title,
            location,
            current,
            to,
            from,
            description
        }
    } = props;

    return (
        <div>
            <h3 className="text-dark">
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
}