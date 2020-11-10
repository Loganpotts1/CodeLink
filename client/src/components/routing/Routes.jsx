import React from "react";
import { Switch, Route } from "react-router-dom";
//  LOCAL
import PrivateRoute from "./PrivateRoute";
import Alert from "../util/Alert";
import Register from "../auth/Register";
import Login from "../auth/Login";
import Profile from "../profile/Profile";
import Profiles from "../profiles/Profiles";
import Dashboard from "../layout/Dashboard";
import CreateProfile from "../profile-forms/CreateProfile";
import AddEducation from "../profile-forms/AddEducation";
import AddExperience from "../profile-forms/AddExperience";


export default function Routes() {

    return (
        <section className="container">

            <Alert />

            <Switch>
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/profiles" component={Profiles} />
                <Route exact path="/profile/:id" component={Profile} />
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
                <PrivateRoute exact path="/create-profile" component={CreateProfile} />
                <PrivateRoute exact path="/add-education" component={AddEducation} />
                <PrivateRoute exact path="/add-experience" component={AddExperience} />
            </Switch>

        </section>
    );
}