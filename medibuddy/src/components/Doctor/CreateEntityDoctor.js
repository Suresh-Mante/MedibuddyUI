import React, { useState, useEffect } from "react";
import { getDataFromServer } from "../DataAccess";
import { BASE_API, DOCTOR_API } from "../Env";
import AppTitle from "../Header/AppTitle";
import Select from '../Shared/Select';
import { getOptionsArray } from "../Utils";
import Loading from '../Shared/Loading';
import { Link, useLocation } from "react-router-dom";

const CreateEntityDoctor = (props) => {
    //for editing
    let existing_doctor = null;
    const location = useLocation();
    if (props.editing) {
        existing_doctor = location.state;
    }
    const [state, setState] = useState({
        doctor: {
            name : existing_doctor ? existing_doctor.name : "",
            type : existing_doctor ? existing_doctor.type : "",
            mobile : existing_doctor ? existing_doctor.mobile : "",
            email : existing_doctor ?  existing_doctor.email : "",
            gender : existing_doctor ? existing_doctor.gender : "",
            fees : existing_doctor ? existing_doctor.fees : 0,
            salary : existing_doctor ? existing_doctor.salary :0,
        },
        validationErrors: [],
        creating: false,
        errors: [],
        messages: [],
        updating: false
    });
    const doctorValid = () => {
        const validationErrors = [];
        if (state.doctor.name == "") {
            validationErrors.push(`Doctor name is requires`);
        }
        if (state.doctor.type == "") {
            validationErrors.push(`Type is required`);
        }
        if (state.doctor.mobile == "") {
            validationErrors.push(`Mobile number is required`);
        }
        if (state.doctor.gender == "") {
            validationErrors.push(`Gender is required`);
        }
        if (state.doctor.gender.length >1 ) {
            validationErrors.push(`Enter only M/F for gender`);
        }       
        if (state.doctor.fees <=0 ) {
            validationErrors.push(`Fees must be positive`);
        }
        if (state.doctor.salary <=0 ) {
            validationErrors.push(`Salary must be positive`);
        }
        return validationErrors;
    }
    const createdoctor = async () => {
        const response = await getDataFromServer(DOCTOR_API + `${existing_doctor ? `/?id=${existing_doctor.id}` : ''}`,
            `${existing_doctor ? 'PUT' : 'POST'}`, state.doctor);
        if (response) {
            if (response.statusCode == 201 || response.statusCode == 204) {
                const doctor = response.record;
                setState({
                    ...state,
                    doctor: existing_doctor ? state.doctor :
                        {
                            name: "",
                            type: "",
                            mobile: "",
                            email :"",
                            gender : "",
                            fees : 0,
                            salary :0,
                        },
                    creating: false,
                    messages: [`doctor ${existing_doctor ? 'updated' : 'created'} successfully...`]
                });
            } else {
                setState({
                    ...state,
                    errors: [response.message]
                });
            }
        } else {
            setState({
                ...state,
                errors: ['Check your internet connection']
            });
        }
    }
    const createNewdoctor = () => {
        const validationErrors = doctorValid();
        if (validationErrors.length == 0) {
            setState({
                ...state,
                creating: true,
                validationErrors: []
            });
        } else {
            setState({
                ...state,
                validationErrors: validationErrors
            })
        }
    }
    useEffect(() => {
        if (state.creating) {
            createdoctor();
        }
    }, [state.creating]);
    return (
        <>
            <div className="flex flex-align-center">
                <Link to={'/doctor'}>
                    <svg viewBox="0 0 24 24" className='icon circle-bg' width='24px' height='24px'
                        style={{ marginRight: '5px' }}>
                        <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"
                            fill='currentColor'></path></svg>
                </Link>
                <div className='app-title flex flex-row flex-align-center flex-justify-center'>
                    <span id='app-title-text'>{`${existing_doctor ? 'Update' : 'Create'} doctor`}</span>
                </div>
            </div>
            <div className="container m-2 flex flex-column" style={{
                gap: '5px'
            }}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input className="form-control" value={state.doctor.name} type={'text'}
                        onChange={(event) => setState({
                            ...state,
                            doctor: {
                                ...state.doctor,
                                name: event.target.value
                            }
                        })}></input>
                </div>              
                <div className="form-group">
                    <label htmlFor="type">Type</label>
                    <input className="form-control" value={state.doctor.type} type={'text'}
                        onChange={(event) => setState({
                            ...state,
                            doctor: {
                                ...state.doctor,
                                type: event.target.value
                            }
                        })}></input>
                </div>
                <div className="form-group">
                    <label htmlFor="mobile">Mobile No</label>
                    <input className="form-control" value={state.doctor.mobile} type={'text'}
                        onChange={(event) => setState({
                            ...state,
                            doctor: {
                                ...state.doctor,
                                mobile: event.target.value
                            }
                        })}></input>
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input className="form-control" value={state.doctor.email} type={'text'}
                        onChange={(event) => setState({
                            ...state,
                            doctor: {
                                ...state.doctor,
                                email: event.target.value
                            }
                        })}></input>
                </div>
                <div className="form-group">
                    <label htmlFor="gender">Gender</label>
                    <input className="form-control" value={state.doctor.gender} type={'text'}
                        onChange={(event) => setState({
                            ...state,
                            doctor: {
                                ...state.doctor,
                                gender: event.target.value
                            }
                        })}></input>
                </div>
                <div className="form-group">
                    <label htmlFor="fees">Fees</label>
                    <input className="form-control" value={state.doctor.fees} type={'text'}
                        onChange={(event) => setState({
                            ...state,
                            doctor: {
                                ...state.doctor,
                                fees: Number(event.target.value)
                            }
                        })}></input>
                </div>
                <div className="form-group">
                    <label htmlFor="salary">Salary</label>
                    <input className="form-control" value={state.doctor.salary} type={'text'}
                        onChange={(event) => setState({
                            ...state,
                            doctor: {
                                ...state.doctor,
                                salary: Number(event.target.value)
                            }
                        })}></input>
                </div>
                <button className="btn btn-primary" onClick={createNewdoctor} disabled={state.creating}>
                    {`${existing_doctor ? 'Update' : 'Create'}`}
                </button>
                {
                    state.creating &&
                    <div className="container flex flex-align-center" style={{
                        gap: '10px'
                    }}>
                        <em>{`${existing_doctor ? 'Update' : 'Create'} doctor`} doctor...</em>
                        <Loading />
                    </div>
                }
            </div>
            {
                state.validationErrors.length > 0 ?
                    <div className="container">
                        {
                            state.validationErrors.map((error, index) => (
                                <div key={index} className="text-danger">{error}</div>
                            ))
                        }
                    </div>
                    : state.errors.length > 0 ?
                        <div className="container">
                            {
                                state.errors.map((error, index) => (
                                    <div key={index} className="text-danger">{error}</div>
                                ))
                            }
                        </div>
                        : state.messages.length > 0 ?
                            <div className="container">
                                {
                                    state.messages.map((msg, index) => (
                                        <div key={index} className="">{msg}</div>
                                    ))
                                }
                            </div>
                            : null
            }
        </>
    );
}

export default CreateEntityDoctor;