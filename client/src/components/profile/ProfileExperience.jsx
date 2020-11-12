import React from "react";
import Moment from "react-moment";

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
                <Moment format="YYYY/MM/DD">{from}</Moment>
                {" - "}
                {
                    current ?
                    ("Current") :
                    <Moment format="YYYY/MM/DD">{to}</Moment>
                }
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