import React, { useState, useEffect } from "react";
import { getDataFromServer } from "../DataAccess";
import { BASE_API, Department_API } from "../Env";
import AppTitle from "../Header/AppTitle";
import Select from '../Shared/Select';
import { getOptionsArray } from "../Utils";
import Loading from '../Shared/Loading';
import { Link, useLocation } from "react-router-dom";

const CreateEntityDepartment = (props) => {
    //for editing
    let existing_department = null;
    const location = useLocation();
    if (props.editing) {
        existing_department = location.state;
    }
    const [state, setState] = useState({
        department: {
            depName : existing_department ? existing_department.depName : "",
        },
        validationErrors: [],
        creating: false,
        errors: [],
        messages: [],
        updating: false
    });
    const departmentValid = () => {
        const validationErrors = [];
        if (state.department.depName == "") {
            validationErrors.push(`Department name is required`);
        }
        
        return validationErrors;
    }
    const createdepartment = async () => {
        const response = await getDataFromServer(Department_API + `${existing_department ? `/?depID=${existing_department.depID}` : ''}`,
            `${existing_department ? 'PUT' : 'POST'}`, state.department);
        if (response) {
            if (response.statusCode == 201 || response.statusCode == 204) {
                const department = response.record;
                setState({
                    ...state,
                    department: existing_department ? state.department :
                        {
                            depName: "",
                        },
                    creating: false,
                    messages: [`department ${existing_department ? 'updated' : 'created'} successfully...`]
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
    const createNewdepartment = () => {
        const validationErrors = departmentValid();
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
            createdepartment();
        }
    }, [state.creating]);
    return (
        <>
            <div className="flex flex-align-center">
                <Link to={'/department'}>
                    <svg viewBox="0 0 24 24" className='icon circle-bg' width='24px' height='24px'
                        style={{ marginRight: '5px' }}>
                        <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"
                            fill='currentColor'></path></svg>
                </Link>
                <div className='app-title flex flex-row flex-align-center flex-justify-center'>
                    <span id='app-title-text'>{`${existing_department ? 'Update' : 'Create'} department`}</span>
                </div>
            </div>
            <div className="container m-2 flex flex-column" style={{
                gap: '5px'
            }}>
                <div className="form-group">
                    <label htmlFor="DepName">DepName</label>
                    <input className="form-control" value={state.department.depName} type={'text'}
                        onChange={(event) => setState({
                            ...state,
                            department: {
                                ...state.department,
                                depName: event.target.value
                            }
                        })}></input>
                </div>  
                <button className="btn btn-primary" onClick={createNewdepartment} disabled={state.creating}>
                    {`${existing_department ? 'Update' : 'Create'}`}
                </button>
                {
                    state.creating &&
                    <div className="container flex flex-align-center" style={{
                        gap: '10px'
                    }}>
                        <em>{`${existing_department ? 'Update' : 'Create'} department`} department...</em>
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

export default CreateEntityDepartment;