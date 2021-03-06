import React, { useState } from "react";
import { useDispatch } from "react-redux";
//  LOCAL
import { addExperience } from "../../actions/profile";


export default function AddExperience() {
    const dispatch = useDispatch();
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
        dispatch(addExperience(formData));
        window.history.back();
    }


    return (
        <section className="edit">


            <button className="btn btn--return" onClick={() => {window.history.back()}}>
                <i className="fas fa-arrow-left"/>
            </button>


            <h1 className="edit__heading">
                Add Your Experience
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
                    <div className="checkbox">
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
                    </div>
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

                <div className="form__submit form__submit--right">
                    <input className="btn btn--primary form__submit form__submit--right" type="submit" value="Submit" />
                </div>


            </form>


        </section>
    );
}