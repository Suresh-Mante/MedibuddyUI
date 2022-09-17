import React, { useState, useEffect } from "react"
import { OPDTest_API } from "../Env";
import AppTitle from "../Header/AppTitle";
import { pascalCase } from "../Utils";
import {getDataFromServer} from  '../DataAccess';

const OPDTest = () => {
    const [state, setState] = useState({
        opdtests: null
    });
    const getopdtests = async () => {
        //use OPDTestAPI.Get
        const response = await getDataFromServer(OPDTest_API, 'GET');
        if (response) {
            if (response.statusCode == 200) {
                const opdtests = response.records;
                //update state with new opdtests
                setState({
                    ...state,
                    opdtests: opdtests
                })
            } else {
                //handle 404/400/500 errors here
            }
        } else {
            //no internet connection/connection refused
        }
    }
    useEffect(() => {
        if (state.opdtests == null) {
            getopdtests();
        }
    }, []);
    return (
        <>
            <AppTitle title={'OPDTest Dashboard'} />
            {
                state.opdtests != null && state.opdtests.length > 0
                    ?
                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                {
                                    Object.keys(state.opdtests[0]).map((property, index) => (
                                        <th key={index}>{pascalCase(property)}</th>
                                    ))
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {
                                state.opdtests.map((opdtests, index) => (
                                    <tr key={index}>
                                        {
                                            Object.keys(opdtests).map((property, index) => (
                                                <td key={index}>{opdtests[property]}</td>
                                            ))
                                        }
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    :
                    <div>No OPDTest records</div>
            }
        </>
    );
}

export default OPDTest;