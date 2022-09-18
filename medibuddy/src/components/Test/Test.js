import React, { useState, useEffect } from "react"
import { TEST_API } from "../Env";
import AppTitle from "../Header/AppTitle";
import { pascalCase } from "../Utils";
import {getDataFromServer} from  '../DataAccess';

import { Link, Route, Routes } from "react-router-dom";
import CreateEntityTest from "./CreateEntityTest";

const Test = () => {
    const [state, setState] = useState({
        tests: null
    });
    const getTests = async () => {
        //use TESTAPI.Get
        const response = await getDataFromServer(TEST_API, 'GET');
        if (response) {
            if (response.statusCode == 200) {
                const tests = response.records;
                //update state with new tests
                setState({
                    ...state,
                    tests: tests
                })
            } else {
                //handle 404/400/500 errors here
            }
        } else {
            //no internet connection/connection refused
        }
    }

    const deleteTest = async(deleted_test) => {
        //use TESTAPI.Delete
        const response = await getDataFromServer(`${TEST_API}/?id=${deleted_test.id}`, 'DELETE');
        if (response) {
            if (response.statusCode == 200) {
                const deleted_test = response.record;
                setState({
                    ...state,
                    tests: state.tests.filter((test) => {
                        return test.id != deleted_test.id
                    })
                })
            } else {
            }
        } else {
        }
    }

    useEffect(() => {
        if (state.tests == null) {
            getTests();
        }
    }, []);
    return (
        <>
            <div className="flex flex-align-center" style={{
                gap: "10px",
                paddingTop: '3px'
            }}>
                <AppTitle title={'Test Dashboard'} />
                <Link to='/Test/Create'>
                    <button className="btn btn-primary">Add new Test</button>
                </Link>
            </div>
            {
                state.tests != null && state.tests.length > 0
                    ?
                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                {
                                    Object.keys(state.tests[0]).map((property, index) => (
                                        <th key={index}>{pascalCase(property)}</th>
                                    ))
                                }
                                <th colSpan={2}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                state.tests.map((test, index) => (
                                    <tr key={index}>
                                        {
                                            Object.keys(test).map((property, index) => (
                                                <td key={index}>{test[property]}</td>
                                            ))
                                        }
                                        <td>
                                            <Link to={`/Test/Edit/${test.id}`} state={test}>
                                                <button className="btn btn-warning">Edit</button>
                                            </Link>
                                        </td>
                                        <td>
                                            <button className="btn btn-danger" onClick={() => deleteTest(test)}>Delete</button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    :
                    <div>No Test records</div>
            }
        </>
    );
}

export default Test;
