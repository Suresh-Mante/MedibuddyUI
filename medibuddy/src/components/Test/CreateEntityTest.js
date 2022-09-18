import React, { useState, useEffect } from "react";
import { getDataFromServer } from "../DataAccess";
import { BASE_API, TEST_API } from "../Env";
import AppTitle from "../Header/AppTitle";
import Select from '../Shared/Select';
import { getOptionsArray } from "../Utils";
import Loading from '../Shared/Loading';
import { Link, useLocation } from "react-router-dom";

const CreateEntityTest = (props) => {
    //for editing
    let existing_test = null;
    /*const location = useLocation();
    if (props.editing) {
        existing_doctor = location.state;
    }*/
    const [state, setState] = useState({
        doctor: {
            name : existing_test ? existing_test.name : "",
            price : existing_test ? existing_test.price :0,
        },
        validationErrors: [],
        creating: false,
        errors: [],
        messages: [],
        updating: false
    });
    const testValid = () => {
        const validationErrors = [];
        if (state.test.name == "") {
            validationErrors.push(`Test name is required`);
        }     
        if (state.test.price < 0 ) {
            validationErrors.push(`Price of a test can't be negative`);
        }
        return validationErrors;
    }
    const createtest = async () => {
        const response = await getDataFromServer(TEST_API + `${existing_test ? `/?id=${existing_test.id}` : ''}`,
            `${existing_test ? 'PUT' : 'POST'}`, state.test);
        if (response) {
            if (response.statusCode == 201 || response.statusCode == 204) {
                const test = response.record;
                setState({
                    ...state,
                    test: existing_test ? state.test :
                        {
                            name: "",
                            price :0,
                        },
                    creating: false,
                    messages: [`test ${existing_test ? 'updated' : 'created'} successfully...`]
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
    const createNewtest = () => {
        const validationErrors = testValid();
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
            createtest();
        }
    }, [state.creating]);
    return (
        <>
            <div className="flex flex-align-center">
                <Link to={'/test'}>
                    <svg viewBox="0 0 24 24" className='icon circle-bg' width='24px' height='24px'
                        style={{ marginRight: '5px' }}>
                        <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"
                            fill='currentColor'></path></svg>
                </Link>
                <div className='app-title flex flex-row flex-align-center flex-justify-center'>
                    <span id='app-title-text'>{`${existing_test ? 'Update' : 'Create'} test`}</span>
                </div>
            </div>
            <div className="container m-2 flex flex-column" style={{
                gap: '5px'
            }}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input className="form-control" value={state.test.name} type={'text'}
                        onChange={(event) => setState({
                            ...state,
                            test: {
                                ...state.test,
                                name: event.target.value
                            }
                        })}></input>
                </div>  
                <div className="form-group">
                    <label htmlFor="price">Price</label>
                    <input className="form-control" value={state.test.price} type={'text'}
                        onChange={(event) => setState({
                            ...state,
                            test: {
                                ...state.test,
                                price: Number(event.target.value)
                            }
                        })}></input>
                </div>
                <button className="btn btn-primary" onClick={createNewtest} disabled={state.creating}>
                    {`${existing_test ? 'Update' : 'Create'}`}
                </button>
                {
                    state.creating &&
                    <div className="container flex flex-align-center" style={{
                        gap: '10px'
                    }}>
                        <em>{`${existing_test ? 'Update' : 'Create'} test`} test...</em>
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

export default CreateEntityTest;