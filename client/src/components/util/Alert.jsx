import React, { Fragment } from "react";
import { useSelector } from "react-redux";

export default function Alert() {
    const alerts = useSelector(state => state.alerts);

    return (
        <Fragment>
            {
                alerts !== null &&
                alerts.length > 0 &&
                alerts.map(alert => (
                    <div key={alert.id} className={`alert alert-${alert.alertType}`}>
                        {alert.msg}
                    </div>
                ))
            }
        </Fragment>
    );

    
}