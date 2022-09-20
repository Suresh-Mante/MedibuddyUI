import React, { useState, useEffect } from "react";
import { getDataFromServer } from "../DataAccess";
import { BASE_API, OPDTest_API } from "../Env";
import AppTitle from "../Header/AppTitle";
import Select from '../Shared/Select';
import { getOptionsArray } from "../Utils";
import Loading from '../Shared/Loading';
import { Link, useLocation } from "react-router-dom";

const CreateEntityOPDTest = (props) => {
    //for editing
    let existing_opdtest = null;
    const location = useLocation();
    if (props.editing) {
        existing_opdtest = location.state;
    }
    const [state, setState] = useState({
        opdtest: {
            OPDBillingID : existing_opdtest ? existing_opdtest.OPDBillingID : 0,
            TestID : existing_opdtest ? existing_opdtest.TestID : 0,
        },
        validationErrors: [],
        creating: false,
        errors: [],
        messages: [],
        updating: false
    });
    const opdtestValid = () => {
        const validationErrors = [];
        if (state.opdtest.depName == "") {
            validationErrors.push(`OPDTest name is required`);
        }
        
        return validationErrors;
    }
    const createopdtest = async () => {
        const response = await getDataFromServer(OPDTest_API + `${existing_opdtest ? `/?id=${existing_opdtest.OPDBillingID}` : ''}`,
            `${existing_opdtest ? 'PUT' : 'POST'}`, state.opdtest);
        if (response) {
            if (response.statusCode == 201 || response.statusCode == 204) {
                const opdtest = response.record;
                setState({
                    ...state,
                    opdtest: existing_opdtest ? state.opdtest :
                        {
                            OPDBillingID: "",
                            TestID: "",
                        },
                    creating: false,
                    messages: [`opdtest ${existing_opdtest ? 'updated' : 'created'} successfully...`]
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
    const createNewopdtest = () => {
        const validationErrors = opdtestValid();
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
            createopdtest();
        }
    }, [state.creating]);
    return (
        <>
            <div className="flex flex-align-center">
                <Link to={'/opdtest'}>
                    <svg viewBox="0 0 24 24" className='icon circle-bg' width='24px' height='24px'
                        style={{ marginRight: '5px' }}>
                        <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"
                            fill='currentColor'></path></svg>
                </Link>
                <div className='app-title flex flex-row flex-align-center flex-justify-center'>
                    <span id='app-title-text'>{`${existing_opdtest ? 'Update' : 'Create'} opdtest`}</span>
                </div>
            </div>
            <div className="container m-2 flex flex-column" style={{
                gap: '5px'
            }}>
                <div className="form-group">
                    <label htmlFor="OPDBillingID">OPDBillingID</label>
                    <input className="form-control" value={state.opdtest.OPDBillingID} type={'number'}
                        onChange={(event) => setState({
                            ...state,
                            opdtest: {
                                ...state.opdtest,
                                OPDBillingID: Number(event.target.value)
                            }
                        })}></input>
                </div>  
                <div className="form-group">
                    <label htmlFor="TestID">TestID</label>
                    <input className="form-control" value={state.opdtest.TestID} type={'number'}
                        onChange={(event) => setState({
                            ...state,
                            opdtest: {
                                ...state.opdtest,
                                TestID: Number(event.target.value)
                            }
                        })}></input>
                </div>
                
                <button className="btn btn-primary" onClick={createNewopdtest} disabled={state.creating}>
                    {`${existing_opdtest ? 'Update' : 'Create'}`}
                </button>
                {
                    state.creating &&
                    <div className="container flex flex-align-center" style={{
                        gap: '10px'
                    }}>
                        <em>{`${existing_opdtest ? 'Update' : 'Create'} opdtest`} opdtest...</em>
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

export default CreateEntityOPDTest;