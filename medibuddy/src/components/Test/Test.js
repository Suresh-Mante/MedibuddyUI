import React, { useState, useEffect } from "react"
import { TEST_API } from "../Env";
import AppTitle from "../Header/AppTitle";
import { pascalCase } from "../Utils";
import {getDataFromServer} from  '../DataAccess';
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
    useEffect(() => {
        if (state.tests == null) {
            getTests();
        }
    }, []);
    return (
        <>
            <AppTitle title={'Test Dashboard'} />
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
