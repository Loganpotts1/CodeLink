import React, { Fragment } from "react";
import { Switch } from "react-router-dom";
//  LOCAL
import Navbar from "./Navbar";
import PrivateRoute from "./PrivateRoute";
import Profile from "../layout/Profile";
import Profiles from "../layout/Profiles";
import Dashboard from "../layout/Dashboard";
import EditProfile from "../forms/ProfileForm";
import AddEducation from "../forms/EducationForm";
import AddExperience from "../forms/ExperienceForm";
import Posts from "../layout/Posts";
import Discussion from "../layout/Discussion";


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