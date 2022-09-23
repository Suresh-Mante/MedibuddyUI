import React, { useState, useEffect } from "react";
import { getDataFromServer } from "../DataAccess";
import { BASE_API, OPD_PATIENT_API } from "../Env";
import Select from '../Shared/Select';
import { formatDate, getOptionsArray } from "../Utils";
import Loading from '../Shared/Loading';
import { Link, useLocation } from "react-router-dom";

const CreateEntity = (props) => {
    //for editing
    let existing_OPDPatient = null;
    const location = useLocation();
    if (props.editing) {
        existing_OPDPatient = location.state;
    }
    const [state, setState] = useState({
        OPDPatient: {
            pid: existing_OPDPatient ? existing_OPDPatient.pid : 0,
            docId: existing_OPDPatient ? existing_OPDPatient.docId : 0,
            visitDate: existing_OPDPatient ? formatDate(new Date(existing_OPDPatient.visitDate)) : formatDate(new Date()),
            opdBillingID: existing_OPDPatient ? existing_OPDPatient.opdBillingID : 0,
        },
        patients: null,
        doctors: null,
        validationErrors: [],
        creating: false,
        errors: [],
        messages: [],
        updating: false
    });
    const OPDPatientValid = () => {
        const validationErrors = [];
        if (state.OPDPatient.pid <= 0) {
            validationErrors.push(`Patient id must be positive`);
        }
        if (state.OPDPatient.docId <= 0) {
            validationErrors.push(`Doctor id must be positive`);
        }
        if (state.OPDPatient.opdBillingID <= 0) {
            validationErrors.push(`OPD BillingID must be positive`);
        }

        return validationErrors;
    }
    const createOPDPatient = async () => {
        const response = await getDataFromServer(OPD_PATIENT_API + `${existing_OPDPatient ? `/?id=${existing_OPDPatient.id}` : ''}`,
            `${existing_OPDPatient ? 'PUT' : 'POST'}`, state.OPDPatient);
        if (response) {
            if (response.statusCode == 201 || response.statusCode == 204) {
                const OPDPatient = response.record;
                setState({
                    ...state,
                    OPDPatient: existing_OPDPatient ? state.OPDPatient :
                        {
                            pid: 0,
                            docId: 0,
                            visitDate: formatDate(new Date()),
                            opdBillingID: 0,
                        },
                    creating: false,
                    messages: [`OPDPatient ${existing_OPDPatient ? 'updated' : 'created'} successfully...`]
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
    const createNewOPDPatient = () => {
        const validationErrors = OPDPatientValid();
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
            createOPDPatient();
        }
    }, [state.creating]);
    return (
        <>
            <div className="flex flex-align-center">
                <Link to={'/OPDPatient'}>
                    <svg viewBox="0 0 24 24" className='icon circle-bg' width='24px' height='24px'
                        style={{ marginRight: '5px' }}>
                        <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"
                            fill='currentColor'></path></svg>
                </Link>
                <div className='app-title flex flex-row flex-align-center flex-justify-center'>
                    <span id='app-title-text'>{`${existing_OPDPatient ? 'Update' : 'Create'} OPDPatient`}</span>
                </div>
            </div>
            <div className="container m-2 flex flex-column" style={{
                gap: '5px'
            }}>
                <div className="form-group">
                    <label htmlFor="OPDPatientSharedCapacity">Patient Id</label>
                    <input className="form-control" value={state.OPDPatient.pid} type={'number'}
                        onChange={(event) => setState({
                            ...state,
                            OPDPatient: {
                                ...state.OPDPatient,
                                pid: Number(event.target.value)
                            }
                        })}></input>
                </div>
                <div className="form-group">
                    <label htmlFor="OPDPatientSharedCapacity">Doctor Id</label>
                    <input className="form-control" value={state.OPDPatient.docId} type={'number'}
                        onChange={(event) => setState({
                            ...state,
                            OPDPatient: {
                                ...state.OPDPatient,
                                docId: Number(event.target.value)
                            }
                        })}></input>
                </div>
                <div className="form-group">
                    <label htmlFor="OPDPatientSharedCapacity">Visit Date</label>
                    <input className="form-control" value={state.OPDPatient.visitDate} type={'date'} readOnly></input>
                </div>
                <div className="form-group">
                    <label htmlFor="OPDPatientSharedCapacity">OPDBilling Id</label>
                    <input className="form-control" value={state.OPDPatient.opdBillingID} type={'number'}
                        onChange={(event) => setState({
                            ...state,
                            OPDPatient: {
                                ...state.OPDPatient,
                                opdBillingID: Number(event.target.value)
                            }
                        })}></input>
                </div>
                <button className="btn btn-primary" onClick={createNewOPDPatient} disabled={state.creating}>
                    {`${existing_OPDPatient ? 'Update' : 'Create'}`}
                </button>
                {
                    state.creating &&
                    <div className="container flex flex-align-center" style={{
                        gap: '10px'
                    }}>
                        <em>{`${existing_OPDPatient ? 'Updating' : 'Creating'}`} OPDPatient...</em>
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