import React, { useState, useEffect } from "react"
import { DOCTOR_API, OPD_PATIENT_API, PATIENT_API } from "../Env";
import AppTitle from "../Header/AppTitle";
import { pascalCase } from "../Utils";
import Loading from '../Shared/Loading';
import { getDataFromServer } from '../DataAccess';
import { Link } from "react-router-dom";
import Search from "../Shared/Search";


const OPDPatient = () => {
    const [state, setState] = useState({
        OPDPatients: null,
        filters: {
            searchBy: null,
            searchText: ''
        }
    });

    const getPatient = async (pid) => {
        const response = await getDataFromServer(`${PATIENT_API}/${pid}`, 'GET');
        if (response) {
            if (response.statusCode == 200) {
                return response.record;
            } else { return null }
        } else { return null }
    }
    const getDoctor = async (id) => {
        const response = await getDataFromServer(`${DOCTOR_API}/${id}`, 'GET');
        if (response) {
            if (response.statusCode == 200) {
                return response.record;
            } else { return null }
        } else { return null }
    }
    const getOPDPatients = async () => {
        //use OPDPatientAPI.Get
        const response = await getDataFromServer(OPD_PATIENT_API, 'GET');
        if (response) {
            if (response.statusCode == 200) {
                const OPDPatients = response.records;
                for (let OPDPatient of OPDPatients) {
                    let patient = await getPatient(OPDPatient.pid);
                    let doctor = await getDoctor(OPDPatient.docId);
                    OPDPatient['patient Name'] = `${patient.firstName} ${patient.midName} ${patient.lastName}`;
                    OPDPatient['doctor Name'] = doctor.name;
                }
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
    const deleteOPDPatient = async (deleted_OPDPatient) => {
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
    const updateTableByFilters = (searchBy, searchText) => {
        setState({
            ...state,
            filters: {
                searchBy: searchBy,
                searchText: searchText
            }
        });
    }
    const getTable = () => {
        if (state.filters.searchBy != null) {
            return state.OPDPatients.filter((OPDPatient) => OPDPatient[state.filters.searchBy]
                .toString().toLowerCase().includes(state.filters.searchText.toLowerCase()));
        }
        else return state.OPDPatients;
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
                    <>
                        <Search dataSource={Object.keys(state.OPDPatients[0])} filterTable={updateTableByFilters} />
                        <table className="table table-bordered table-striped">
                            <thead>
                                <tr>
                                    {
                                        Object.keys(state.OPDPatients[0]).map((property, index) => (
                                            <th key={index}>{pascalCase(property)}</th>
                                        ))
                                    }
                                    <th colSpan={3}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    getTable().map((OPDPatient, index) => (
                                        <tr key={index}>
                                            {
                                                Object.keys(OPDPatient).map((property, index) => (
                                                    <td key={index}>{OPDPatient[property].toString()}</td>
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
                                            {
                                                !OPDPatient.discharged ?
                                                    <td>
                                                        <Link to={`/OPDPatient/Discharge/${OPDPatient.id}`} state={OPDPatient}>
                                                            <button className="btn btn-success">Discharge</button>
                                                        </Link>
                                                    </td>
                                                    : <td>
                                                        <button className="btn btn-success" disabled>Discharge</button>
                                                    </td>
                                            }
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </>
                    :
                    <div className="flex flex-align-center" style={{ gap: '10px' }}>
                        Fetching data...
                        <Loading />
                    </div>
            }
        </>
    );
}

export default OPDPatient;