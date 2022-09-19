
import React, { useState, useEffect } from "react";
import { getDataFromServer } from "../DataAccess";
import { BASE_API, MEDICINE_API } from "../Env";
import AppTitle from "../Header/AppTitle";
import Select from '../Shared/Select';
import { getOptionsArray } from "../Utils";
import Loading from '../Shared/Loading';
import { Link, useLocation } from "react-router-dom";

const CreateEntityMedicine = (props) => {
    //for editing
    console.log(props.medicine);
    let existing_medicine = null;
    const location = useLocation();
    if (props.editing) {
        existing_medicine = location.state;
    }
    const [state, setState] = useState({
        medicine: {
            name : existing_medicine ? existing_medicine.name : "",
            price : existing_medicine ? existing_medicine.price :0,
        },
        validationErrors: [],
        creating: false,
        errors: [],
        messages: [],
        updating: false
    });
    const medicineValid = () => {
        const validationErrors = [];
        if (state.medicine.name == "") {
            validationErrors.push(`Medicine name is required`);
        }     
        if (state.medicine.price < 0 ) {
            validationErrors.push(`Price of a Medicine can't be negative`);
        }
        return validationErrors;
    }
    const createmedicine = async () => {
        const response = await getDataFromServer(MEDICINE_API + `${existing_medicine ? `/?id=${existing_medicine.id}` : ''}`,
            `${existing_medicine ? 'PUT' : 'POST'}`, state.medicine);
        if (response) {
            if (response.statusCode == 201 || response.statusCode == 204) {
                const medicine = response.record;
                setState({
                    ...state,
                    medicine: existing_medicine ? state.medicine :
                        {
                            name : "",
                            price :0,
                        },
                    creating: false,
                    messages: [`Medicine ${existing_medicine ? 'updated' : 'created'} successfully...`]
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
    const createNewmedicine= () => {
        const validationErrors = medicineValid();
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
            createmedicine();
        }
    }, [state.creating]);
    return (
        <>
            <div className="flex flex-align-center">
                <Link to={'/medicine'}>
                    <svg viewBox="0 0 24 24" className='icon circle-bg' width='24px' height='24px'
                        style={{ marginRight: '5px' }}>
                        <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"
                            fill='currentColor'></path></svg>
                </Link>
                <div className='app-title flex flex-row flex-align-center flex-justify-center'>
                    <span id='app-title-text'>{`${existing_medicine ? 'Update' : 'Create'} medicine`}</span>
                </div>
            </div>
            <div className="container m-2 flex flex-column" style={{
                gap: '5px'
            }}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input className="form-control" value={state.medicine.name} type={'text'}
                        onChange={(event) => setState({
                            ...state,
                            medicine: {
                                ...state.medicine,
                                name: event.target.value
                            }
                        })}></input>
                </div>  
                <div className="form-group">
                    <label htmlFor="price">Price</label>
                    <input className="form-control" value={state.medicine.price} type={'number'}
                        onChange={(event) => setState({
                            ...state,
                            medicine: {
                                ...state.medicine,
                                price: event.target.value
                            }
                        })}></input>
                </div>
                <button className="btn btn-primary" onClick={createNewmedicine} disabled={state.creating}>
                    {`${existing_medicine ? 'Update' : 'Create'}`}
                </button>
                {
                    state.creating &&
                    <div className="container flex flex-align-center" style={{
                        gap: '10px'
                    }}>
                        <em>{`${existing_medicine ? 'Update' : 'Create'} medicine`} medicine...</em>
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

export default CreateEntityMedicine;