import React, { useState, useEffect } from "react"
import { OPD_PATIENT_API } from "../Env";
import AppTitle from "../Header/AppTitle";
import { pascalCase } from "../Utils";
import {getDataFromServer} from  '../DataAccess';

const OPDPatient = () => {
    const [state, setState] = useState({
        OPDPatients: null
    });
    const getOPDPatients = async () => {
        //use OPDPatientAPI.Get
        const response = await getDataFromServer(OPD_PATIENT_API, 'GET');
        if (response) {
            if (response.statusCode == 200) {
                const OPDPatients = response.records;
                //update state with new OPDPatients
                setState({
                    ...state,
                    OPDPatients: OPDPatients
                })
            } else {
                //handle 404/400/500 errors here
            }
        } else {
            //no internet connection/connection refused
        }
    }
    useEffect(() => {
        if (state.OPDPatients == null) {
            getOPDPatients();
        }
    }, []);
    return (
        <>
            <AppTitle title={'OPDPatient Dashboard'} />
            {
                state.OPDPatients != null && state.OPDPatients.length > 0
                    ?
                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                {
                                    Object.keys(state.OPDPatients[0]).map((property, index) => (
                                        <th key={index}>{pascalCase(property)}</th>
                                    ))
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {
                                state.OPDPatients.map((OPDPatient, index) => (
                                    <tr key={index}>
                                        {
                                            Object.keys(OPDPatient).map((property, index) => (
                                                <td key={index}>{OPDPatient[property]}</td>
                                            ))
                                        }
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    :
                    <div>No OPDPatient records</div>
            }
        </>
    );
}

export default OPDPatient;