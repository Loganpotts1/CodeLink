import React, { useState } from "react";
import { useDispatch } from "react-redux";
//  LOCAL
import { addEducation } from "../../actions/profile";


export default function AddEducation(props) {
    const dispatch = useDispatch();
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
        dispatch(addEducation(formData));
        window.history.back();
    }


    return (
        <section className="edit">


            <button className="btn btn--return" onClick={() => {window.history.back()}}>
                <i className="fas fa-arrow-left"/>
            </button>


            <h1 className="edit__heading">
                Add Your Education
            </h1>


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
                        <div className="checkbox">
                            <input
                                className="checkbox__input"
                                type="checkbox"
                                name="current"
                                checked={current}
                                value={current}
                                onChange={() => setFormData({ ...formData, current: !current })}
                            />
                            <span className="checkbox__check">
                                <i className="fas fa-check"/>
                            </span>
                        </div>
                        <p className="checkbox__label">
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

                <div className="form__submit form__submit--right">
                    <input type="submit" value="Submit" className="btn btn--primary" />
                </div>

            </form>


        </section>
    );
}