import React, { useState, Fragment } from "react";
import { useHistory, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
//  LOCAL
import { addEducation } from "../../actions/profile";


export default function AddEducation(props) {
    const dispatch = useDispatch();
    const history = useHistory();
    const initialState = {
        school: "",
        degree: "",
        fieldofstudy: "",
        from: "",
        to: "",
        current: false,
        description: ""
    };
    const [ formData, setFormData ] = useState(initialState);
    const {
        school,
        degree,
        fieldofstudy,
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
        dispatch(addEducation(formData, history));
    }


    return (
        <section className="profile">


            <h1 className="profile__heading">
                Add Your Education
            </h1>


            <p className="profile__desc">
                <i className="fas fa-code-branch" /> 
                Add any school or bootcamp that you
                have attended
            </p>


            <small>
                * = required field
            </small>


            <form className="form" onSubmit={onSubmit}>

                <div className="form__group">
                    <input
                        type="text"
                        placeholder="* School or Bootcamp"
                        name="school"
                        value={school}
                        onChange={onChange}
                        required
                    />
                </div>

                <div className="form__group">
                    <input
                        type="text"
                        placeholder="* Degree or Certificate"
                        name="degree"
                        value={degree}
                        onChange={onChange}
                        required
                    />
                </div>

                <div className="form__group">
                    <input
                        type="text"
                        placeholder="* Field of Study"
                        name="fieldofstudy"
                        value={fieldofstudy}
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
                    <p>
                        <input
                            type="checkbox"
                            name="current"
                            checked={current}
                            value={current}
                            onChange={() => setFormData({ ...formData, current: !current })}
                        />
                        {' '}
                        Current School
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
                        placeholder="Program Description"
                        value={description}
                        onChange={onChange}
                    />
                </div>

                <input type="submit" className="form__submit btn btn--primary" />

                <Link className="btn btn--tertiary" to="/dashboard">
                    Go Back
                </Link>

            </form>


      </section>
    );
}