import React, { useState, Fragment } from "react";
import { useHistory, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
//  LOCAL
import { addExperience } from "../../actions/profile";


export default function AddExperience() {
    const dispatch = useDispatch();
    const history = useHistory();
    const initialState = {
        company: "",
        title: "",
        location: "",
        from: "",
        to: "",
        current: false,
        description: ""
    };

    const [ formData, setFormData ] = useState(initialState);
    const {
        company,
        title,
        location,
        from,
        to,
        current,
        description
    } = formData;


    const onChange = event => {
        setFormData({ ...formData, [event.target.name] : event.target.value });
    }


    const onSubmit = event => {
        event.preventDefault();
        dispatch(addExperience(formData, history));
    }


    return (
        <div className="profile">


            <Link className="btn btn--tertiary profile__return" to="/dashboard">
                <i className="fas fa-arrow-left"/>
            </Link>


            <h1 className="profile__heading">
                Add An Experience
            </h1>


            <small>
                * = required field
            </small>


            <form className="form" onSubmit={onSubmit}>

                <div className="form__group">
                    <input
                        type="text"
                        placeholder="* Job Title"
                        name="title"
                        value={title}
                        onChange={onChange}
                        required
                    />
                </div>

                <div className="form__group">
                    <input
                        type="text"
                        placeholder="* Company"
                        name="company"
                        value={company}
                        onChange={onChange}
                        required
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
                </div>

                <div className="form__group">
                    <h4>
                        From Date:
                    </h4>
                    <input 
                        type="date" 
                        name="from" 
                        value={from} 
                        onChange={onChange} 
                    />
                </div>

                <div className="form__group">
                    <span className="checkbox">
                        <input
                            className="checkbox__input"
                            type="checkbox"
                            name="current"
                            checked={current}
                            value={current}
                            onChange={() => {
                                setFormData({ ...formData, current: !current });
                            }}
                        />
                        <span className="checkbox__check">
                            <i className="fas fa-check"/>
                        </span>
                    </span>
                    <p className="checkbox__label">
                        Current Job
                    </p>
                </div>

                <div className="form__group">
                    <h4>
                        To Date:
                    </h4>
                    <input
                        type="date"
                        name="to"
                        value={to}
                        onChange={onChange}
                        disabled={current}
                    />
                </div>

                <div className="form__group">
                    <textarea
                        name="description"
                        cols="30"
                        rows="5"
                        placeholder="Job Description"
                        value={description}
                        onChange={onChange}
                    />
                </div>

                <input className="form__submit btn btn--primary" type="submit" value="Submit" />

            </form>


        </div>
    );
}