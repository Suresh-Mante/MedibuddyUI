import React, { useState, useEffect } from "react";
import { getDataFromServer } from "../DataAccess";
import { BASE_API, IPD_PATIENT_API } from "../Env";
import Select from '../Shared/Select';
import { formatDate, getOptionsArray } from "../Utils";
import Loading from '../Shared/Loading';
import { Link, useLocation } from "react-router-dom";

const CreateEntity = (props) => {
    //for editing
    let existing_IPDPatient = null;
    const location = useLocation();
    if (props.editing) {
        existing_IPDPatient = location.state;
    }
    const [state, setState] = useState({
        IPDPatient: {
            pid: existing_IPDPatient ? existing_IPDPatient.pid : 0,
            docId: existing_IPDPatient ? existing_IPDPatient.docId : 0,
            nurseID: existing_IPDPatient ? existing_IPDPatient.nurseID : 0,
            entryDate: existing_IPDPatient ? formatDate(new Date(existing_IPDPatient.entryDate)) : formatDate(new Date()),
            roomID: existing_IPDPatient ? existing_IPDPatient.roomID : 0,
        },
        patients: null,
        doctors: null,
        validationErrors: [],
        creating: false,
        errors: [],
        messages: [],
        updating: false
    });
    const IPDPatientValid = () => {
        const validationErrors = [];
        if (state.IPDPatient.pid <= 0) {
            validationErrors.push(`Patient id must be positive`);
        }
        if (state.IPDPatient.docId <= 0) {
            validationErrors.push(`Doctor id must be positive`);
        }
        if (state.IPDPatient.nurseID <= 0) {
            validationErrors.push(`Nurse id must be positive`);
        }
        if (state.IPDPatient.roomID <= 0) {
            validationErrors.push(`RoomID must be positive`);
        }

        return validationErrors;
    }
    const createIPDPatient = async () => {
        const response = await getDataFromServer(IPD_PATIENT_API + `${existing_IPDPatient ? `/?id=${existing_IPDPatient.id}` : ''}`,
            `${existing_IPDPatient ? 'PUT' : 'POST'}`, state.IPDPatient);
        if (response) {
            if (response.statusCode == 201 || response.statusCode == 204) {
                const IPDPatient = response.record;
                setState({
                    ...state,
                    IPDPatient: existing_IPDPatient ? state.IPDPatient :
                        {
                            pid: 0,
                            docId: 0,
                            nurseID: 0,
                            entryDate: formatDate(new Date()),
                            roomID: 0,
                        },
                    creating: false,
                    messages: [`IPDPatient ${existing_IPDPatient ? 'updated' : 'created'} successfully...`]
                });
            } else {
                setState({
                    ...state,
                    errors: [response.statusMessage]
                });
            }
        } else {
            setState({
                ...state,
                errors: ['Check your internet connection']
            });
        }
    }
    const createNewIPDPatient = () => {
        const validationErrors = IPDPatientValid();
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
            createIPDPatient();
        }
    }, [state.creating]);
    return (
        <>
            <div className="flex flex-align-center">
                <Link to={'/IPDPatient'}>
                    <svg viewBox="0 0 24 24" className='icon circle-bg' width='24px' height='24px'
                        style={{ marginRight: '5px' }}>
                        <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"
                            fill='currentColor'></path></svg>
                </Link>
                <div className='app-title flex flex-row flex-align-center flex-justify-center'>
                    <span id='app-title-text'>{`${existing_IPDPatient ? 'Update' : 'Create'} IPDPatient`}</span>
                </div>
            </div>
            <div className="container m-2 flex flex-column" style={{
                gap: '5px'
            }}>
                <div className="form-group">
                    <label htmlFor="IPDPatientSharedCapacity">Patient Id</label>
                    <input className="form-control" value={state.IPDPatient.pid} type={'number'}
                        onChange={(event) => setState({
                            ...state,
                            IPDPatient: {
                                ...state.IPDPatient,
                                pid: Number(event.target.value)
                            }
                        })}></input>
                </div>
                <div className="form-group">
                    <label htmlFor="IPDPatientSharedCapacity">Doctor Id</label>
                    <input className="form-control" value={state.IPDPatient.docId} type={'number'}
                        onChange={(event) => setState({
                            ...state,
                            IPDPatient: {
                                ...state.IPDPatient,
                                docId: Number(event.target.value)
                            }
                        })}></input>
                </div>
                <div className="form-group">
                    <label htmlFor="IPDPatientSharedCapacity">Nurse Id</label>
                    <input className="form-control" value={state.IPDPatient.nurseID} type={'number'}
                        onChange={(event) => setState({
                            ...state,
                            IPDPatient: {
                                ...state.IPDPatient,
                                nurseID: Number(event.target.value)
                            }
                        })}></input>
                </div>
                <div className="form-group">
                    <label htmlFor="IPDPatientSharedCapacity">Entry Date</label>
                    <input className="form-control" value={state.IPDPatient.entryDate} type={'date'} readOnly></input>
                </div>
                
                <div className="form-group">
                    <label htmlFor="IPDPatientSharedCapacity">Room Id</label>
                    <input className="form-control" value={state.IPDPatient.roomID} type={'number'}
                        onChange={(event) => setState({
                            ...state,
                            IPDPatient: {
                                ...state.IPDPatient,
                                roomID: Number(event.target.value)
                            }
                        })}></input>
                </div>
                <button className="btn btn-primary" onClick={createNewIPDPatient} disabled={state.creating}>
                    {`${existing_IPDPatient ? 'Update' : 'Create'}`}
                </button>
                {
                    state.creating &&
                    <div className="container flex flex-align-center" style={{
                        gap: '10px'
                    }}>
                        <em>{`${existing_IPDPatient ? 'Updating' : 'Creating'}`} IPDPatient...</em>
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