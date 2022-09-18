import React, { useState, useEffect } from "react";
import { getDataFromServer } from "../DataAccess";
import { BASE_API, NURSE_API } from "../Env";
import AppTitle from "../Header/AppTitle";
import Select from '../Shared/Select';
import { getOptionsArray } from "../Utils";
import Loading from '../Shared/Loading';
import { Link, useLocation } from "react-router-dom";

const CreateEntityNurse = (props) => {
    //for editing
    let existing_nurse = null;
    const location = useLocation();
    if (props.editing) {
        existing_nurse = location.state;
    }
    const [state, setState] = useState({
        nurse: {
            name : existing_nurse ? existing_nurse.name : "",
            type : existing_nurse ? existing_nurse.type : "",
            mobile : existing_nurse ? existing_nurse.mobile : "",
            email : existing_nurse ?  existing_nurse.email : "",
            gender : existing_nurse ? existing_nurse.gender : "",
            salary : existing_nurse ? existing_nurse.salary :0,
        },
        validationErrors: [],
        creating: false,
        errors: [],
        messages: [],
        updating: false
    });
    const nurseValid = () => {
        const validationErrors = [];
        if (state.nurse.name == "") {
            validationErrors.push(`nurse name is requires`);
        }
        if (state.nurse.mobile == "") {
            validationErrors.push(`Mobile number is required`);
        }
        if (state.nurse.gender == "") {
            validationErrors.push(`Gender is required`);
        }
        if (state.nurse.gender.length >1 ) {
            validationErrors.push(`Enter only M/F for gender`);
        }       
        if (state.nurse.salary <=0 ) {
            validationErrors.push(`Salary must be positive`);
        }
        return validationErrors;
    }
    const createnurse = async () => {
        const response = await getDataFromServer(NURSE_API + `${existing_nurse ? `/?id=${existing_nurse.id}` : ''}`,
            `${existing_nurse ? 'PUT' : 'POST'}`, state.nurse);
        if (response) {
            if (response.statusCode == 201 || response.statusCode == 204) {
                const nurse = response.record;
                setState({
                    ...state,
                    nurse: existing_nurse ? state.nurse :
                        {
                            name: "",
                            mobile: "",
                            email :"",
                            gender : "",
                            salary :0,
                        },
                    creating: false,
                    messages: [`nurse ${existing_nurse ? 'updated' : 'created'} successfully...`]
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
    const createNewnurse = () => {
        const validationErrors = nurseValid();
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
            createnurse();
        }
    }, [state.creating]);
    return (
        <>
            <div className="flex flex-align-center">
                <Link to={'/nurse'}>
                    <svg viewBox="0 0 24 24" className='icon circle-bg' width='24px' height='24px'
                        style={{ marginRight: '5px' }}>
                        <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"
                            fill='currentColor'></path></svg>
                </Link>
                <div className='app-title flex flex-row flex-align-center flex-justify-center'>
                    <span id='app-title-text'>{`${existing_nurse ? 'Update' : 'Create'} nurse`}</span>
                </div>
            </div>
            <div className="container m-2 flex flex-column" style={{
                gap: '5px'
            }}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input className="form-control" value={state.nurse.name} type={'text'}
                        onChange={(event) => setState({
                            ...state,
                            nurse: {
                                ...state.nurse,
                                name: event.target.value
                            }
                        })}></input>
                </div>              
                <div className="form-group">
                    <label htmlFor="mobile">Mobile No</label>
                    <input className="form-control" value={state.nurse.mobile} type={'text'}
                        onChange={(event) => setState({
                            ...state,
                            nurse: {
                                ...state.nurse,
                                mobile: event.target.value
                            }
                        })}></input>
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input className="form-control" value={state.nurse.email} type={'text'}
                        onChange={(event) => setState({
                            ...state,
                            nurse: {
                                ...state.nurse,
                                email: event.target.value
                            }
                        })}></input>
                </div>
                <div className="form-group">
                    <label htmlFor="gender">Gender</label>
                    <input className="form-control" value={state.nurse.gender} type={'text'}
                        onChange={(event) => setState({
                            ...state,
                            nurse: {
                                ...state.nurse,
                                gender: event.target.value
                            }
                        })}></input>
                </div>
                <div className="form-group">
                    <label htmlFor="salary">Salary</label>
                    <input className="form-control" value={state.nurse.salary} type={'text'}
                        onChange={(event) => setState({
                            ...state,
                            nurse: {
                                ...state.nurse,
                                salary: Number(event.target.value)
                            }
                        })}></input>
                </div>
                <button className="btn btn-primary" onClick={createNewnurse} disabled={state.creating}>
                    {`${existing_nurse ? 'Update' : 'Create'}`}
                </button>
                {
                    state.creating &&
                    <div className="container flex flex-align-center" style={{
                        gap: '10px'
                    }}>
                        <em>{`${existing_nurse ? 'Update' : 'Create'} nurse`} nurse...</em>
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

export default CreateEntityNurse;