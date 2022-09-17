import React, { useState, useEffect } from "react";
import { getDataFromServer } from "../DataAccess";
import { BASE_API, WARD_API } from "../Env";
import AppTitle from "../Header/AppTitle";
import Select from '../Shared/Select';
import { getOptionsArray } from "../Utils";
import Loading from '../Shared/Loading';
import { Link, useLocation } from "react-router-dom";

const CreateEntity = (props) => {
    //for editing
    let existing_ward = null;
    const location = useLocation();
    if (props.editing) {
        existing_ward = location.state;
    }
    const [state, setState] = useState({
        ward: {
            depId: existing_ward ? existing_ward.depId : null,
            roomSpecialCapacity: existing_ward ? existing_ward.roomSpecialCapacity : 0,
            roomSharedCapacity: existing_ward ? existing_ward.roomSharedCapacity : 0,
            roomGeneralCapacity: existing_ward ? existing_ward.roomGeneralCapacity : 0,
        },
        departments: null,
        validationErrors: [],
        creating: false,
        errors: [],
        messages: [],
        updating: false
    });
    const getDepartments = async () => {
        const response = await getDataFromServer(BASE_API + 'department', 'GET');
        if (response) {
            if (response.statusCode == 200) {
                const departments = response.records;
                setState({
                    ...state,
                    departments: departments
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
    const updateDepartment = (depName) => {
        const dep = state.departments.filter((dep) => {
            return dep.depName == depName;
        })[0];
        if (dep) {
            setState({
                ...state,
                ward: {
                    ...state.ward,
                    depId: dep.depID
                }
            });
        }
    }
    const wardValid = () => {
        const validationErrors = [];
        if (state.ward.depId == null) {
            validationErrors.push(`Department is not valid`);
        }
        if (state.ward.roomSharedCapacity <= 0) {
            validationErrors.push(`Room Shared Capacity must be positive`);
        }
        if (state.ward.roomSpecialCapacity <= 0) {
            validationErrors.push(`Room Special Capacity must be positive`);
        }
        if (state.ward.roomGeneralCapacity <= 0) {
            validationErrors.push(`Room General Capacity must be positive`);
        }

        return validationErrors;
    }
    const createWard = async () => {
        const response = await getDataFromServer(WARD_API + `${existing_ward ? `/?id=${existing_ward.id}` : ''}`,
            `${existing_ward ? 'PUT' : 'POST'}`, state.ward);
        if (response) {
            if (response.statusCode == 201 || response.statusCode == 204) {
                const ward = response.record;
                setState({
                    ...state,
                    ward: existing_ward ? state.ward :
                        {
                            depId: null,
                            roomSpecialCapacity: 0,
                            roomSharedCapacity: 0,
                            roomGeneralCapacity: 0
                        },
                    creating: false,
                    messages: [`Ward ${existing_ward ? 'updated' : 'created'} successfully...`]
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
    const createNewWard = () => {
        const validationErrors = wardValid();
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
        if (state.departments == null) {
            getDepartments();
        }
    }, [state.departments]);
    useEffect(() => {
        if (state.creating) {
            createWard();
        }
    }, [state.creating]);
    return (
        <>
            <div className="flex flex-align-center">
                <Link to={'/Ward'}>
                    <svg viewBox="0 0 24 24" className='icon circle-bg' width='24px' height='24px'
                        style={{ marginRight: '5px' }}>
                        <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"
                            fill='currentColor'></path></svg>
                </Link>
                <div className='app-title flex flex-row flex-align-center flex-justify-center'>
                    <span id='app-title-text'>{`${existing_ward ? 'Update' : 'Create'} Ward`}</span>
                </div>
            </div>
            <div className="container m-2 flex flex-column" style={{
                gap: '5px'
            }}>
                <div className="form-group">
                    <label htmlFor="depId">Department</label>
                    {
                        state.departments && state.departments.length > 0 &&
                        <Select dataSource={getOptionsArray(state.departments, 'depName')} name={'Department'}
                            onChange={updateDepartment} defaultValue={existing_ward ?
                                state.departments.filter((dep) => {
                                    return dep.depID == existing_ward.depId
                                })[0].depName : null} />
                    }
                </div>
                <div className="form-group">
                    <label htmlFor="roomSpecialCapacity">RoomSpecialCapacity</label>
                    <input className="form-control" value={state.ward.roomSpecialCapacity} type={'number'}
                        onChange={(event) => setState({
                            ...state,
                            ward: {
                                ...state.ward,
                                roomSpecialCapacity: Number(event.target.value)
                            }
                        })}></input>
                </div>
                <div className="form-group">
                    <label htmlFor="roomSharedCapacity">RoomSharedCapacity</label>
                    <input className="form-control" value={state.ward.roomSharedCapacity} type={'number'}
                        onChange={(event) => setState({
                            ...state,
                            ward: {
                                ...state.ward,
                                roomSharedCapacity: Number(event.target.value)
                            }
                        })}></input>
                </div>
                <div className="form-group">
                    <label htmlFor="roomGeneralCapacity">RoomGeneralCapacity</label>
                    <input className="form-control" value={state.ward.roomGeneralCapacity} type={'number'}
                        onChange={(event) => setState({
                            ...state,
                            ward: {
                                ...state.ward,
                                roomGeneralCapacity: Number(event.target.value)
                            }
                        })}></input>
                </div>
                <button className="btn btn-primary" onClick={createNewWard} disabled={state.creating}>
                    {`${existing_ward ? 'Update' : 'Create'}`}
                </button>
                {
                    state.creating &&
                    <div className="container flex flex-align-center" style={{
                        gap: '10px'
                    }}>
                        <em>{`${existing_ward ? 'Update' : 'Create'} Ward`} ward...</em>
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

export default CreateEntity;