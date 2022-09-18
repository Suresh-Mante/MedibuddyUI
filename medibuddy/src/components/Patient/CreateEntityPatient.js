import React, { useState, useEffect } from "react";
import { getDataFromServer } from "../DataAccess";
import { BASE_API, PATIENT_API } from "../Env";
import AppTitle from "../Header/AppTitle";
import Select from '../Shared/Select';
import { getOptionsArray } from "../Utils";
import Loading from '../Shared/Loading';
import { Link, useLocation } from "react-router-dom";

const CreateEntityPatient = (props) => {
    //for editing
    let existing_patient = null;
    const location = useLocation();
    if (props.editing) {
        existing_patient = location.state;
    }
    const [state, setState] = useState({
        patient: {
            FirstName : existing_patient ? existing_patient.FirstName : "",
            MidName : existing_patient ? existing_patient.MidName : "",
            LastName : existing_patient ? existing_patient.LastName : "",
            mobile : existing_patient ? existing_patient.mobile : "",
            email : existing_patient ?  existing_patient.email : "",
            address : existing_patient ? existing_patient.address : "",
            gender : existing_patient ? existing_patient.gender : "",
            DOB : existing_patient ? existing_patient.DOB : "",
        },
        validationErrors: [],
        creating: false,
        errors: [],
        messages: [],
        updating: false
    });
    const patientValid = () => {
        const validationErrors = [];
        if (state.patient.FirstName == "") {
            validationErrors.push(`Patient Firstname is required`);
        }
        if (state.patient.LastName == "") {
            validationErrors.push(`Patient Lastname is required`);
        }
        if (state.patient.mobile == "") {
            validationErrors.push(`Mobile number is required`);
        }
        if (state.patient.gender == "") {
            validationErrors.push(`Gender is required`);
        }
        if (state.patient.gender.length >1 ) {
            validationErrors.push(`Enter only M/F for gender`);
        }
        if (state.patient.DOB == "") {
            validationErrors.push(`Patient DOB is required`);
        }
        if (state.patient.address == "") {
            validationErrors.push(`Patient Address is required`);
        }
        return validationErrors;
    }
    const createpatient = async () => {
        const response = await getDataFromServer(PATIENT_API + `${existing_patient ? `/?pid=${existing_patient.pid}` : ''}`,
            `${existing_patient ? 'PUT' : 'POST'}`, state.patient);
        if (response) {
            if (response.statusCode == 201 || response.statusCode == 204) {
                const patient = response.record;
                setState({
                    ...state,
                    patient: existing_patient ? state.patient :
                        {
                            FirstName: "",
                            MidName: "",
                            LastName: "",
                            mobile: "",
                            email :"",
                            address: "",
                            gender : "",
                            DOB : "",
                        },
                    creating: false,
                    messages: [`patient ${existing_patient ? 'updated' : 'created'} successfully...`]
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
    const createNewpatient = () => {
        const validationErrors = patientValid();
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
            createpatient();
        }
    }, [state.creating]);
    return (
        <>
            <div className="flex flex-align-center">
                <Link to={'/patient'}>
                    <svg viewBox="0 0 24 24" className='icon circle-bg' width='24px' height='24px'
                        style={{ marginRight: '5px' }}>
                        <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"
                            fill='currentColor'></path></svg>
                </Link>
                <div className='app-title flex flex-row flex-align-center flex-justify-center'>
                    <span id='app-title-text'>{`${existing_patient ? 'Update' : 'Create'} patient`}</span>
                </div>
            </div>
            <div className="container m-2 flex flex-column" style={{
                gap: '5px'
            }}>
                <div className="form-group">
                    <label htmlFor="FirstName">FirstName</label>
                    <input className="form-control" value={state.patient.FirstName} type={'text'}
                        onChange={(event) => setState({
                            ...state,
                            patient: {
                                ...state.patient,
                                FirstName: event.target.value
                            }
                        })}></input>
                </div>  
                <div className="form-group">
                    <label htmlFor="MidName">MidName</label>
                    <input className="form-control" value={state.patient.MidName} type={'text'}
                        onChange={(event) => setState({
                            ...state,
                            patient: {
                                ...state.patient,
                                MidName: event.target.value
                            }
                        })}></input>
                </div>  
                <div className="form-group">
                    <label htmlFor="LastName">LastName</label>
                    <input className="form-control" value={state.patient.LastName} type={'text'}
                        onChange={(event) => setState({
                            ...state,
                            patient: {
                                ...state.patient,
                                LastName: event.target.value
                            }
                        })}></input>
                </div>              
                <div className="form-group">
                    <label htmlFor="mobile">Mobile No</label>
                    <input className="form-control" value={state.patient.mobile} type={'text'}
                        onChange={(event) => setState({
                            ...state,
                            patient: {
                                ...state.patient,
                                mobile: event.target.value
                            }
                        })}></input>
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input className="form-control" value={state.patient.email} type={'text'}
                        onChange={(event) => setState({
                            ...state,
                            patient: {
                                ...state.patient,
                                email: event.target.value
                            }
                        })}></input>
                </div>
                <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <input className="form-control" value={state.patient.address} type={'text'}
                        onChange={(event) => setState({
                            ...state,
                            patient: {
                                ...state.patient,
                                address: event.target.value
                            }
                        })}></input>
                </div>  
                <div className="form-group">
                    <label htmlFor="gender">Gender</label>
                    <input className="form-control" value={state.patient.gender} type={'text'}
                        onChange={(event) => setState({
                            ...state,
                            patient: {
                                ...state.patient,
                                gender: event.target.value
                            }
                        })}></input>
                </div>
                <div className="form-group">
                    <label htmlFor="DOB">DOB</label>
                    <input className="form-control" value={state.patient.DOB} type={'text'}
                        onChange={(event) => setState({
                            ...state,
                            patient: {
                                ...state.patient,
                                DOB: event.target.value
                            }
                        })}></input>
                </div>
                <button className="btn btn-primary" onClick={createNewpatient} disabled={state.creating}>
                    {`${existing_patient ? 'Update' : 'Create'}`}
                </button>
                {
                    state.creating &&
                    <div className="container flex flex-align-center" style={{
                        gap: '10px'
                    }}>
                        <em>{`${existing_patient ? 'Update' : 'Create'} patient`} patient...</em>
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

export default CreateEntityPatient;