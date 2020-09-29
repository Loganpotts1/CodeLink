import React from "react";
import { Switch, Route } from "react-router-dom";
//  LOCAL
import PrivateRoute from "./PrivateRoute";
import Alert from "../util/Alert";
import Register from "../auth/Register";
import Login from "../auth/Login";
import Dashboard from "../layout/Dashboard";
import CreateProfile from "../profile/CreateProfile";


export default function Routes() {

    return (
        <section className="container">

            <Alert />

            <Switch>
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
                <Route exact path="/create-profile" component={CreateProfile} />
            </Switch>

        </section>
    );
}