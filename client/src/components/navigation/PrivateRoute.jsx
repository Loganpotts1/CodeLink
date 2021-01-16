import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
//  LOCAL
import Spinner from "../utils/Spinner";


export default function PrivateRoute({ component: Component, ...rest }) {
    const { isAuthenticated, loading } = useSelector(state => state.auth);


    return (
        <Route {...rest}>
            {
                props => !isAuthenticated ?
                <Redirect to="/" /> :
                loading ?
                <Spinner /> :
                <Component {...props} />
            }
        </Route>
    );
}