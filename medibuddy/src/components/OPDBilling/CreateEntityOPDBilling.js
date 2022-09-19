import React, { useState, useEffect } from "react";
import { getDataFromServer } from "../DataAccess";
import { BASE_API, OPDBilling_API } from "../Env";
import AppTitle from "../Header/AppTitle";
import Select from '../Shared/Select';
import { getOptionsArray } from "../Utils";
import Loading from '../Shared/Loading';
import { Link, useLocation } from "react-router-dom";

const CreateEntityOPDBilling = (props) => {
    //for editing
    let existing_opdbilling = null;
    const location = useLocation();
    if (props.editing) {
        existing_opdbilling = location.state;
    }
    const [state, setState] = useState({
        opdbilling: {
            pid : existing_opdbilling ? existing_opdbilling.pid : 0,
            docId : existing_opdbilling ? existing_opdbilling.docId : 0,
        },
        validationErrors: [],
        creating: false,
        errors: [],
        messages: [],
        updating: false
    });
    const opdbillingValid = () => {
        const validationErrors = [];
        if (state.opdbilling.depName == "") {
            validationErrors.push(`OPDBilling name is required`);
        }
        
        return validationErrors;
    }
    const createopdbilling = async () => {
        const response = await getDataFromServer(OPDBilling_API + `${existing_opdbilling ? `/?id=${existing_opdbilling.id}` : ''}`,
            `${existing_opdbilling ? 'PUT' : 'POST'}`, state.opdbilling);
        if (response) {
            if (response.statusCode == 201 || response.statusCode == 204) {
                const opdbilling = response.record;
                setState({
                    ...state,
                    opdbilling: existing_opdbilling ? state.opdbilling :
                        {
                            pid: "",
                            docId: "",
                        },
                    creating: false,
                    messages: [`opdbilling ${existing_opdbilling ? 'updated' : 'created'} successfully...`]
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
    const createNewopdbilling = () => {
        const validationErrors = opdbillingValid();
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
            createopdbilling();
        }
    }, [state.creating]);
    return (
        <>
            <div className="flex flex-align-center">
                <Link to={'/opdbilling'}>
                    <svg viewBox="0 0 24 24" className='icon circle-bg' width='24px' height='24px'
                        style={{ marginRight: '5px' }}>
                        <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"
                            fill='currentColor'></path></svg>
                </Link>
                <div className='app-title flex flex-row flex-align-center flex-justify-center'>
                    <span id='app-title-text'>{`${existing_opdbilling ? 'Update' : 'Create'} opdbilling`}</span>
                </div>
            </div>
            <div className="container m-2 flex flex-column" style={{
                gap: '5px'
            }}>
                <div className="form-group">
                    <label htmlFor="pid">pid</label>
                    <input className="form-control" value={state.opdbilling.pid} type={'number'}
                        onChange={(event) => setState({
                            ...state,
                            opdbilling: {
                                ...state.opdbilling,
                                pid: Number(event.target.value)
                            }
                        })}></input>
                </div>  
                <div className="form-group">
                    <label htmlFor="docId">docId</label>
                    <input className="form-control" value={state.opdbilling.docId} type={'number'}
                        onChange={(event) => setState({
                            ...state,
                            opdbilling: {
                                ...state.opdbilling,
                                docId: Number(event.target.value)
                            }
                        })}></input>
                </div>
                
                <button className="btn btn-primary" onClick={createNewopdbilling} disabled={state.creating}>
                    {`${existing_opdbilling ? 'Update' : 'Create'}`}
                </button>
                {
                    state.creating &&
                    <div className="container flex flex-align-center" style={{
                        gap: '10px'
                    }}>
                        <em>{`${existing_opdbilling ? 'Update' : 'Create'} opdbilling`} opdbilling...</em>
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

export default CreateEntityOPDBilling;