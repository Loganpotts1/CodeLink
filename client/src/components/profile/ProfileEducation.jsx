import React from "react";
import Moment from "react-moment";

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
                <Moment format="YYYY/MM/DD">{from}</Moment>
                {" - "}
                {
                    current ?
                    ("Current") :
                    <Moment format="YYYY/MM/DD">{to}</Moment>
                }
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