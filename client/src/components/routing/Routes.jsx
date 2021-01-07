import React, { Fragment } from "react";
import { Switch, Route } from "react-router-dom";
//  LOCAL
import Navbar from "../layout/Navbar";
import PrivateRoute from "./PrivateRoute";
import Alert from "../utils/Alert";
import Profile from "../profile/Profile";
import Profiles from "../profiles/Profiles";
import Dashboard from "../layout/Dashboard";
import EditProfile from "../profile-forms/EditProfile";
import AddEducation from "../profile-forms/AddEducation";
import AddExperience from "../profile-forms/AddExperience";
import Posts from "../posts/Posts";
import Discussion from "../post/Discussion";


export default function Routes() {

    return (
        <Fragment>

			<Navbar />

			<div className="page__content">
                <Switch>
                    <PrivateRoute exact path="/profiles" component={Profiles} />
                    <PrivateRoute exact path="/profile/:id" component={Profile} />
                    <PrivateRoute exact path="/dashboard" component={Dashboard} />
                    <PrivateRoute exact path="/edit-profile" component={EditProfile} />
                    <PrivateRoute exact path="/add-education" component={AddEducation} />
                    <PrivateRoute exact path="/add-experience" component={AddExperience} />
                    <PrivateRoute exact path="/posts" component={Posts} />
                    <PrivateRoute exact path="/posts/:id" component={Discussion} />
                </Switch>
            </div>
        </Fragment>
    );
}