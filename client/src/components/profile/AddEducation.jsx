import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
//  LOCAL
import { addEducation } from "../../actions/profile";


export default function AddEducation() {
    const dispatch = useDispatch();
    const history = useHistory();
    const initialState = {
        school: "",
        degree: "",
        fieldOfStudy: "",
        from: "",
        to: "",
        current: "",
        description: ""
    };
    const [ formData, setFormData ] = useState(initialState);
    const {
        school,
        degree,
        fieldOfStudy,
        from,
        to,
        current,
        description
    } = formData;


    const onChange = event => {
        setFormData({ ...formData, [event.target.name] : event.target.value });
    }


    return (
        <Fragment>


            <h1 className="large text-primary">
                Add Your Education
            </h1>


            <p className="lead">
                <i className="fas fa-code-branch" /> 
                Add any school or bootcamp that you
                have attended
            </p>


            <small>* = required field</small>


            <form
                className="form"
                onSubmit={e => {
                    e.preventDefault();
                    dispatch(addEducation(formData, history));
                }}
            >

                <div className="form-group">
                    <input
                        type="text"
                        placeholder="* School or Bootcamp"
                        name="school"
                        value={school}
                        onChange={onChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <input
                        type="text"
                        placeholder="* Degree or Certificate"
                        name="degree"
                        value={degree}
                        onChange={onChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Field of Study"
                        name="fieldOfStudy"
                        value={fieldOfStudy}
                        onChange={onChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <h4>
                        From Date
                    </h4>
                    <input type="date" name="from" value={from} onChange={onChange} />
                </div>

                <div className="form-group">
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

                <div className="form-group">
                    <h4>
                        To Date
                    </h4>
                    <input
                        type="date"
                        name="to"
                        value={to}
                        onChange={onChange}
                        disabled={current}
                    />
                </div>

                <div className="form-group">
                    <textarea
                        name="description"
                        cols="30"
                        rows="5"
                        placeholder="Program Description"
                        value={description}
                        onChange={onChange}
                    />
                </div>

                <input type="submit" className="btn btn-primary my-1" />

                <Link className="btn btn-light my-1" to="/dashboard">
                    Go Back
                </Link>

            </form>


      </Fragment>
    );
}