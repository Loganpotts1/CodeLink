import React from "react";
import { Switch, Route } from "react-router-dom";
//  LOCAL
import Alert from "../util/Alert";
import Register from "../auth/Register";
import Login from "../auth/Login";
import Dashboard from "../layout/Dashboard";


export default function Routing(component) {

    return (
        <section className="container">

            <Alert />

            <Switch>
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/dashboard" component={Dashboard} />
            </Switch>

        </section>
    );
}