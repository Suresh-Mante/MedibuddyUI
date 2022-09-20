import React, { useState, useEffect } from "react";
import { getDataFromServer } from "../DataAccess";
import { BASE_API, OPDMEDICINE_API } from "../Env";
import AppTitle from "../Header/AppTitle";
import Select from '../Shared/Select';
import { getOptionsArray } from "../Utils";
import Loading from '../Shared/Loading';
import { Link, useLocation } from "react-router-dom";

const CreateEntityOPDMedicine = (props) => {
    //for editing
    let existing_opdmedicine = null;
    const location = useLocation();
    if (props.editing) {
        existing_opdmedicine = location.state;
    }
    const [state, setState] = useState({
        opdmedicine: {
            OPDBillingID : existing_opdmedicine ? existing_opdmedicine.OPDBillingID : 0,
            MedicineID : existing_opdmedicine ? existing_opdmedicine.MedicineID : 0,
        },
        validationErrors: [],
        creating: false,
        errors: [],
        messages: [],
        updating: false
    });
    const opdmedicineValid = () => {
        const validationErrors = [];
        if (state.opdmedicine.depName == "") {
            validationErrors.push(`OPDMedicine name is required`);
        }
        
        return validationErrors;
    }
    const createopdmedicine = async () => {
        const response = await getDataFromServer(OPDMEDICINE_API + `${existing_opdmedicine ? `/?id=${existing_opdmedicine.OPDBillingID}` : ''}`,
            `${existing_opdmedicine ? 'PUT' : 'POST'}`, state.opdmedicine);
        if (response) {
            if (response.statusCode == 201 || response.statusCode == 204) {
                const opdmedicine = response.record;
                setState({
                    ...state,
                    opdmedicine: existing_opdmedicine ? state.opdmedicine :
                        {
                            OPDBillingID: "",
                            MedicineID: "",
                        },
                    creating: false,
                    messages: [`opdmedicine ${existing_opdmedicine ? 'updated' : 'created'} successfully...`]
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
    const createNewopdmedicine = () => {
        const validationErrors = opdmedicineValid();
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
            createopdmedicine();
        }
    }, [state.creating]);
    return (
        <>
            <div className="flex flex-align-center">
                <Link to={'/opdmedicine'}>
                    <svg viewBox="0 0 24 24" className='icon circle-bg' width='24px' height='24px'
                        style={{ marginRight: '5px' }}>
                        <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"
                            fill='currentColor'></path></svg>
                </Link>
                <div className='app-title flex flex-row flex-align-center flex-justify-center'>
                    <span id='app-title-text'>{`${existing_opdmedicine ? 'Update' : 'Create'} opdmedicine`}</span>
                </div>
            </div>
            <div className="container m-2 flex flex-column" style={{
                gap: '5px'
            }}>
                <div className="form-group">
                    <label htmlFor="OPDBillingID">OPDBillingID</label>
                    <input className="form-control" value={state.opdmedicine.OPDBillingID} type={'number'}
                        onChange={(event) => setState({
                            ...state,
                            opdmedicine: {
                                ...state.opdmedicine,
                                OPDBillingID: Number(event.target.value)
                            }
                        })}></input>
                </div>  
                <div className="form-group">
                    <label htmlFor="MedicineID">MedicineID</label>
                    <input className="form-control" value={state.opdmedicine.MedicineID} type={'number'}
                        onChange={(event) => setState({
                            ...state,
                            opdmedicine: {
                                ...state.opdmedicine,
                                MedicineID: Number(event.target.value)
                            }
                        })}></input>
                </div>
                
                <button className="btn btn-primary" onClick={createNewopdmedicine} disabled={state.creating}>
                    {`${existing_opdmedicine ? 'Update' : 'Create'}`}
                </button>
                {
                    state.creating &&
                    <div className="container flex flex-align-center" style={{
                        gap: '10px'
                    }}>
                        <em>{`${existing_opdmedicine ? 'Update' : 'Create'} opdmedicine`} opdmedicine...</em>
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

export default CreateEntityOPDMedicine;