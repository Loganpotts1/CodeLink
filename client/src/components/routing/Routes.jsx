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
import EditProfile from "../profile-forms/EditProfile";
import AddEducation from "../profile-forms/AddEducation";
import AddExperience from "../profile-forms/AddExperience";
import Posts from "../posts/Posts";


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
                <PrivateRoute exact path="/edit-profile" component={EditProfile} />
                <PrivateRoute exact path="/add-education" component={AddEducation} />
                <PrivateRoute exact path="/add-experience" component={AddExperience} />
                <PrivateRoute exact path="/posts" component={Posts} />
            </Switch>

        </section>
    );
}