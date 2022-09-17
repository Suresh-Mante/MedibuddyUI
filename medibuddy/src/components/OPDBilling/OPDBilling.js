import React, { useState, useEffect } from "react"
import { OPDBilling_API } from "../Env";
import AppTitle from "../Header/AppTitle";
import { pascalCase } from "../Utils";
import {getDataFromServer} from  '../DataAccess';

const OPDBilling = () => {
    const [state, setState] = useState({
        OPDBillings: null
    });
    const getOPDBillings = async () => {
        //use OPDBillingAPI.Get
        const response = await getDataFromServer(OPDBilling_API, 'GET');
        if (response) {
            if (response.statusCode == 200) {
                const OPDBillings = response.records;
                //update state with new OPDBillings
                setState({
                    ...state,
                    OPDBillings: OPDBillings
                })
            } else {
                //handle 404/400/500 errors here
            }
        } else {
            //no internet connection/connection refused
        }
    }
    useEffect(() => {
        if (state.OPDBillings == null) {
            getOPDBillings();
        }
    }, []);
    return (
        <>
            <AppTitle title={'OPDBilling Dashboard'} />
            {
                state.OPDBillings != null && state.OPDBillings.length > 0
                    ?
                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                {
                                    Object.keys(state.OPDBillings[0]).map((property, index) => (
                                        <th key={index}>{pascalCase(property)}</th>
                                    ))
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {
                                state.OPDBillings.map((OPDBilling, index) => (
                                    <tr key={index}>
                                        {
                                            Object.keys(OPDBilling).map((property, index) => (
                                                <td key={index}>{OPDBilling[property]}</td>
                                            ))
                                        }
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    :
                    <div>No OPDBilling records</div>
            }
        </>
    );
}

export default OPDBilling;