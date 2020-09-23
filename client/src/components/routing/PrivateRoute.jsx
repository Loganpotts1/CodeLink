import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

export default function PrivateRoute({ component: Component, ...rest }) {
    const { isAuthenticated } = useSelector(state => state.auth);

    return (
        <Route {...rest}>
            {
                isAuthenticated ?
                ( <Component /> ) :
                ( <Redirect to="/login" /> )
            }
        </Route>
    );
}