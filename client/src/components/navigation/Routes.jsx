import React, { Fragment, lazy, Suspense } from "react";
import { Switch } from "react-router-dom";
//  LOCAL
import Navbar from "./Navbar";
import PrivateRoute from "./PrivateRoute";
import Spinner from "../utils/Spinner";

const Profile = lazy(() => import("../layout/Profile"));
const Profiles = lazy(() => import("../layout/Profiles"));
const Dashboard = lazy(() => import("../layout/Dashboard"));
const EditProfile = lazy(() => import("../forms/ProfileForm"));
const AddEducation = lazy(() => import("../forms/EducationForm"));
const AddExperience = lazy(() => import("../forms/ExperienceForm"));
const Posts = lazy(() => import("../layout/Posts"));
const Discussion = lazy(() => import("../layout/Discussion"));


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