import React, { useState, useEffect } from "react";
import { getDataFromServer } from "../DataAccess";
import { BASE_API, IPDMEDICINE_API } from "../Env";
import AppTitle from "../Header/AppTitle";
import Select from '../Shared/Select';
import { getOptionsArray } from "../Utils";
import Loading from '../Shared/Loading';
import { Link, useLocation } from "react-router-dom";

const CreateEntityIPDMedicine = (props) => {
    //for editing
    let existing_ipdmedicine = null;
    const location = useLocation();
    if (props.editing) {
        existing_ipdmedicine = location.state;
    }
    const [state, setState] = useState({
        ipdmedicine: {
            IPDPatientID : existing_ipdmedicine ? existing_ipdmedicine.IPDPatientID : 0,
            MedicineID : existing_ipdmedicine ? existing_ipdmedicine.MedicineID : 0,
        },
        validationErrors: [],
        creating: false,
        errors: [],
        messages: [],
        updating: false
    });
    const ipdmedicineValid = () => {
        const validationErrors = [];
        if (state.ipdmedicine.depName == "") {
            validationErrors.push(`IPDMedicine name is required`);
        }
        
        return validationErrors;
    }
    const createipdmedicine = async () => {
        const response = await getDataFromServer(IPDMEDICINE_API + `${existing_ipdmedicine ? `/?id=${existing_ipdmedicine.IPDPatientID}` : ''}`,
            `${existing_ipdmedicine ? 'PUT' : 'POST'}`, state.ipdmedicine);
        if (response) {
            if (response.statusCode == 201 || response.statusCode == 204) {
                const ipdmedicine = response.record;
                setState({
                    ...state,
                    ipdmedicine: existing_ipdmedicine ? state.ipdmedicine :
                        {
                            IPDPatientID: "",
                            MedicineID: "",
                        },
                    creating: false,
                    messages: [`ipdmedicine ${existing_ipdmedicine ? 'updated' : 'created'} successfully...`]
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
    const createNewipdmedicine = () => {
        const validationErrors = ipdmedicineValid();
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
            createipdmedicine();
        }
    }, [state.creating]);
    return (
        <>
            <div className="flex flex-align-center">
                <Link to={'/ipdmedicine'}>
                    <svg viewBox="0 0 24 24" className='icon circle-bg' width='24px' height='24px'
                        style={{ marginRight: '5px' }}>
                        <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"
                            fill='currentColor'></path></svg>
                </Link>
                <div className='app-title flex flex-row flex-align-center flex-justify-center'>
                    <span id='app-title-text'>{`${existing_ipdmedicine ? 'Update' : 'Create'} ipdmedicine`}</span>
                </div>
            </div>
            <div className="container m-2 flex flex-column" style={{
                gap: '5px'
            }}>
                <div className="form-group">
                    <label htmlFor="IPDPatientID">IPDPatientID</label>
                    <input className="form-control" value={state.ipdmedicine.IPDPatientID} type={'number'}
                        onChange={(event) => setState({
                            ...state,
                            ipdmedicine: {
                                ...state.ipdmedicine,
                                IPDPatientID: Number(event.target.value)
                            }
                        })}></input>
                </div>  
                <div className="form-group">
                    <label htmlFor="MedicineID">MedicineID</label>
                    <input className="form-control" value={state.ipdmedicine.MedicineID} type={'number'}
                        onChange={(event) => setState({
                            ...state,
                            ipdmedicine: {
                                ...state.ipdmedicine,
                                MedicineID: Number(event.target.value)
                            }
                        })}></input>
                </div>
                
                <button className="btn btn-primary" onClick={createNewipdmedicine} disabled={state.creating}>
                    {`${existing_ipdmedicine ? 'Update' : 'Create'}`}
                </button>
                {
                    state.creating &&
                    <div className="container flex flex-align-center" style={{
                        gap: '10px'
                    }}>
                        <em>{`${existing_ipdmedicine ? 'Update' : 'Create'} ipdmedicine`} ipdmedicine...</em>
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

export default CreateEntityIPDMedicine;