import React from "react";
//  LOCAL
import spinner from "../../img/spinner.svg";


export default function Spinner(props) {
    let { width } = props;
    
    return (
        <img 
            src={spinner}
            style={{ width: width || "100px", margin:"auto", display: "block" }}
            alt="Loading..."
        />
    );
}