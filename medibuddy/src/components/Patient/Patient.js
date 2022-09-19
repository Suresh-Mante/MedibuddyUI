import React, { useState, useEffect } from "react"
import { PATIENT_API } from "../Env";
import AppTitle from "../Header/AppTitle";
import { pascalCase } from "../Utils";
import { getDataFromServer } from '../DataAccess';
import { Link, Route, Routes } from "react-router-dom";
import CreateEntityPatient from "./CreateEntityPatient";

const Patient = () => {
    const [state, setState] = useState({
        patients: null
    });
    const getPatients = async () => {
        //use PatientAPI.Get
        const response = await getDataFromServer(PATIENT_API, 'GET');
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
    const deletePatient = async(deleted_patient) => {
        //use PatientAPI.Delete
        const response = await getDataFromServer(`${PATIENT_API}/?pid=${deleted_patient.pid}`, 'DELETE');
        if (response) {
            if (response.statusCode == 200) {
                const deleted_patient = response.record;
                setState({
                    ...state,
                    patients: state.patients.filter((patient) => {
                        return patient.pid != deleted_patient.pid
                    })
                })
            } else {
                alert(`response ${response.statusCode}`);
            }
        } else {
        }
    }
    useEffect(() => {
        if (state.patients == null) {
            getPatients();
        }
    }, []);
    return (
        <>
            <div className="flex flex-align-center" style={{
                gap: "10px",
                paddingTop: '3px'
            }}>
                <AppTitle title={'Patient Dashboard'} />
                <Link to='/Patient/Create'>
                    <button className="btn btn-primary">Add new Patient</button>
                </Link>
            </div>
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
                                <th colSpan={2}>Actions</th>
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
                                        <td>
                                            <Link to={`/Patient/Edit/${patient.pid}`} state={patient}>
                                                <button className="btn btn-warning">Edit</button>
                                            </Link>
                                        </td>
                                        <td>
                                            <button className="btn btn-danger" onClick={() => deletePatient(patient)}>Delete</button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    :
                    <div>No Patient records</div>
            }
        </>
    );
}

export default Patient;