import React, { useState, useEffect } from "react"
import { PATIENT } from "../Env";
import AppTitle from "../Header/AppTitle";
import { getDataFromServer, pascalCase } from "../Utils";
import '../../../node_modules/bootstrap/dist/css/bootstrap.css'
const Patient = () => {
    const [state, setState] = useState({
        patients: null
    });
    const getPatients = async () => {
        //use PatientAPI.Get
        const response = await getDataFromServer(PATIENT, 'GET');
        if (response) {
            if (response.statusCode == 200) {
                const patients = response.records;
                //update state with new patients
                setState({
                    ...state,
                    patients: patients
                })
            } else {
                //handle 404/400/500 errors here
            }
        } else {
            //no internet connection/connection refused
        }
    }
    useEffect(() => {
        if (state.patients == null) {
            getPatients();
        }
    }, []);
    return (
        <>
            <AppTitle title={'Patient Dashboard'} />
            {
                state.patients != null && state.patients.length > 0
                    ?
                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                {
                                    Object.keys(state.patients[0]).map((property, index) => (
                                        <th key={index}>{pascalCase(property)}</th>
                                    ))
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {
                                state.patients.map((patient, index) => (
                                    <tr key={index}>
                                        {
                                            Object.keys(patient).map((property, index) => (
                                                <td key={index}>{patient[property]}</td>
                                            ))
                                        }
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    :
                    <div>No patient records</div>
            }
        </>
    );
}

export default Patient;