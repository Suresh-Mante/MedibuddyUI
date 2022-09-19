import React, { useState, useEffect } from "react"
import { OPD_PATIENT_API } from "../Env";
import AppTitle from "../Header/AppTitle";
import { pascalCase } from "../Utils";
import { getDataFromServer } from '../DataAccess';
import { Link, Route, Routes } from "react-router-dom";


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
    const deleteOPDPatient = async(deleted_OPDPatient) => {
        //use OPDPatientAPI.Delete
        const response = await getDataFromServer(`${OPD_PATIENT_API}/?id=${deleted_OPDPatient.id}`, 'DELETE');
        if (response) {
            if (response.statusCode == 200) {
                const deleted_OPDPatient = response.record;
                setState({
                    ...state,
                    OPDPatients: state.OPDPatients.filter((OPDPatient) => {
                        return OPDPatient.id != deleted_OPDPatient.id
                    })
                })
            } else {
            }
        } else {
        }
    }
    useEffect(() => {
        if (state.OPDPatients == null) {
            getOPDPatients();
        }
    }, []);
    return (
        <>
            <div className="flex flex-align-center" style={{
                gap: "10px",
                paddingTop: '3px'
            }}>
                <AppTitle title={'OPDPatient Dashboard'} />
                <Link to='/OPDPatient/Create'>
                    <button className="btn btn-primary">Add new OPDPatient</button>
                </Link>
            </div>
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
                                <th colSpan={2}>Actions</th>
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
                                        <td>
                                            <Link to={`/OPDPatient/Edit/${OPDPatient.id}`} state={OPDPatient}>
                                                <button className="btn btn-warning">Edit</button>
                                            </Link>
                                        </td>
                                        <td>
                                            <button className="btn btn-danger" onClick={() => deleteOPDPatient(OPDPatient)}>Delete</button>
                                        </td>
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