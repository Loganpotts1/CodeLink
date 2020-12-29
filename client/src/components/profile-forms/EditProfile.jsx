import React, { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
//  LOCAL
import { getCurrentProfile, createProfile } from "../../actions/profile";


export default function CreateProfile() {
    const { profile, loading } = useSelector(state => state.profile);
    const dispatch = useDispatch();

    const [ formData, setFormData ] = useState({
        avatar: "",
        company: "",
        website: "",
        location: "",
        status: "",
        skills: "",
        githubusername: "",
        bio: "",
        twitter: "",
        facebook: "",
        linkedin: "",
        youtube: "",
        instagram: ""
    });


    useEffect(() => {
        //  Make sure that user's profile is in the state
        if (!profile)
        dispatch(getCurrentProfile());

        //  Populating const profileData with properties from profile state
        if (profile && !loading) {
            const temp = { ...formData };

            for (const key in profile) {
                if (key in temp)
                temp[key] = profile[key];
            }

            for (const key in profile.social) {
                if (key in temp)
                temp[key] = profile.social[key] || "";
            }

            if (Array.isArray(profile.skills))
            temp.skills = profile.skills.join();
            //  Then set formData to profileData
            setFormData(temp);
        }
        // eslint-disable-next-line
    }, []);


    const {
        avatar,
        company,
        website,
        location,
        status,
        skills,
        githubusername,
        bio,
        twitter,
        facebook,
        linkedin,
        youtube,
        instagram
    } = formData;

    const [ displaySocialInputs, setDisplaySocialInputs ] = useState(false);


    const onChange = event => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    }


    const onSubmit = event => {
        event.preventDefault();
        dispatch(createProfile(formData, profile ? true : false));
        window.history.back();
    };


    return (
        <section className="edit">


            <button className="btn btn--return" onClick={() => {window.history.back()}}>
                <i className="fas fa-arrow-left"/>
            </button>


            <h1 className="edit__heading">
                Edit Your Profile
            </h1>


            <small>
                * = required field
            </small>


            <form className="form" onSubmit={onSubmit}>

                <div className="form__group">
                    <select name="status" value={status} onChange={onChange}>
                        <option>* Select Professional Status</option>
                        <option value="Developer">Developer</option>
                        <option value="Junior Developer">Junior Developer</option>
                        <option value="Senior Developer">Senior Developer</option>
                        <option value="Manager">Manager</option>
                        <option value="Student or Learning">Student or Learning</option>
                        <option value="Instructor">Instructor or Teacher</option>
                        <option value="Intern">Intern</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <div className="form__group">
                    <input
                        type="text"
                        placeholder="Avatar Image"
                        name="avatar"
                        value={avatar}
                        onChange={onChange}
                    />
                </div>

                <div className="form__group">
                    <input
                        type="text"
                        placeholder="Company"
                        name="company"
                        value={company}
                        onChange={onChange}
                    />
                </div>

                <div className="form__group">
                    <input
                        type="text"
                        placeholder="Website"
                        name="website"
                        value={website}
                        onChange={onChange}
                    />
                </div>

                <div className="form__group">
                    <input
                        type="text"
                        placeholder="Location"
                        name="location"
                        value={location}
                        onChange={onChange}
                    />
                    <small className="form__text">
                        City & state suggested (eg. Boston, MA)
                    </small>
                </div>

                <div className="form__group">
                    <input
                        type="text"
                        placeholder="* Skills"
                        name="skills"
                        value={skills}
                        onChange={onChange}
                    />
                    <small className="form__text">
                        Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
                    </small>
                </div>

                <div className="form__group">
                    <input
                        type="text"
                        placeholder="Github Username"
                        name="githubusername"
                        value={githubusername}
                        onChange={onChange}
                    />
                    <small className="form__text">
                        If you want your latest repos and a Github link, include your
                        username
                    </small>
                </div>

                <div className="form__group">
                    <textarea
                        placeholder="A short bio of yourself"
                        name="bio"
                        value={bio}
                        onChange={onChange}
                    />
                </div>

                <div className="edit__social">
                    <button
                        onClick={() => setDisplaySocialInputs(!displaySocialInputs)}
                        type="button"
                        className="btn btn--tertiary"
                    >
                        Add Social Links
                    </button>
                </div>

                {
                    displaySocialInputs && 
                    <Fragment>

                        <div className="form__group form__group--social">
                            <i className="fab fa-twitter fa-2x" />
                            <input
                                type="text"
                                placeholder="Twitter URL"
                                name="twitter"
                                value={twitter}
                                onChange={onChange}
                            />
                        </div>

                        <div className="form__group form__group--social">
                            <i className="fab fa-facebook fa-2x" />
                            <input
                                type="text"
                                placeholder="Facebook URL"
                                name="facebook"
                                value={facebook}
                                onChange={onChange}
                            />
                        </div>

                        <div className="form__group form__group--social">
                            <i className="fab fa-youtube fa-2x" />
                            <input
                                type="text"
                                placeholder="YouTube URL"
                                name="youtube"
                                value={youtube}
                                onChange={onChange}
                            />
                        </div>

                        <div className="form__group form__group--social">
                            <i className="fab fa-linkedin fa-2x" />
                            <input
                                type="text"
                                placeholder="Linkedin URL"
                                name="linkedin"
                                value={linkedin}
                                onChange={onChange}
                            />
                        </div>

                        <div className="form__group form__group--social">
                            <i className="fab fa-instagram fa-2x" />
                            <input
                                type="text"
                                placeholder="Instagram URL"
                                name="instagram"
                                value={instagram}
                                onChange={onChange}
                            />
                        </div>
                        
                    </Fragment>
                }

                <input type="submit" value="Submit" className="btn btn--primary form__submit"/>

            </form>


        </section>
    );
}
