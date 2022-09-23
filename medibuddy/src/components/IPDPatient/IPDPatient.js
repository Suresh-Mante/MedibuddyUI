import React, { useState, useEffect } from "react"
import { DOCTOR_API, IPD_PATIENT_API, PATIENT_API, NURSE_API,ROOM_API} from "../Env";
import AppTitle from "../Header/AppTitle";
import { pascalCase } from "../Utils";
import Loading from '../Shared/Loading';
import { getDataFromServer } from '../DataAccess';
import { Link } from "react-router-dom";
import Search from "../Shared/Search";


const IPDPatient = () => {
    const [state, setState] = useState({
        IPDPatients: null,
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
    const getNurse = async (id) => {
        const response = await getDataFromServer(`${NURSE_API}/${id}`, 'GET');
        if (response) {
            if (response.statusCode == 200) {
                return response.record;
            } else { return null }
        } else { return null }
    }
    const getRoom = async (id) => {
        const response = await getDataFromServer(`${ROOM_API}/${id}`, 'GET');
        if (response) {
            if (response.statusCode == 200) {
                return response.record;
            } else { return null }
        } else { return null }
    }
    const getIPDPatients = async () => {
        //use IPDPatientAPI.Get
        const response = await getDataFromServer(IPD_PATIENT_API, 'GET');
        if (response) {
            if (response.statusCode == 200) {
                const IPDPatients = response.records;
                for (let IPDPatient of IPDPatients) {
                    let patient = await getPatient(IPDPatient.pid);
                    let doctor = await getDoctor(IPDPatient.docId);
                    let nurse = await getNurse(IPDPatient.nurseID);
                    let room = await getRoom(IPDPatient.roomID);
                    IPDPatient['patient Name'] = `${patient.firstName} ${patient.midName} ${patient.lastName}`;
                    IPDPatient['doctor Name'] = doctor.name;
                    IPDPatient['nurse Name'] = nurse.name;
                    IPDPatient['room Name'] = room.type;
                }
                //update state with new IPDPatients
                setState({
                    ...state,
                    IPDPatients: IPDPatients
                })
            } else {
                //handle 404/400/500 errors here
            }
        } else {
            //no internet connection/connection refused
        }
    }
    const deleteIPDPatient = async (deleted_IPDPatient) => {
        //use IPDPatientAPI.Delete
        const response = await getDataFromServer(`${IPD_PATIENT_API}/?id=${deleted_IPDPatient.id}`, 'DELETE');
        if (response) {
            if (response.statusCode == 200) {
                const deleted_IPDPatient = response.record;
                setState({
                    ...state,
                    IPDPatients: state.IPDPatients.filter((IPDPatient) => {
                        return IPDPatient.id != deleted_IPDPatient.id
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
            return state.IPDPatients.filter((IPDPatient) => IPDPatient[state.filters.searchBy]
                .toString().toLowerCase().includes(state.filters.searchText.toLowerCase()));
        }
        else return state.IPDPatients;
    }
    useEffect(() => {
        if (state.IPDPatients == null) {
            getIPDPatients();
        }
    }, []);
    return (
        <>
            <div className="flex flex-align-center" style={{
                gap: "10px",
                paddingTop: '3px'
            }}>
                <AppTitle title={'IPDPatient Dashboard'} />
                <Link to='/IPDPatient/Create'>
                    <button className="btn btn-primary">Add new IPDPatient</button>
                </Link>
            </div>
            {
                state.IPDPatients != null && state.IPDPatients.length > 0
                    ?
                    <>
                        <Search dataSource={Object.keys(state.IPDPatients[0])} filterTable={updateTableByFilters} />
                        <table className="table table-bordered table-striped">
                            <thead>
                                <tr>
                                    {
                                        Object.keys(state.IPDPatients[0]).map((property, index) => (
                                            <th key={index}>{pascalCase(property)}</th>
                                        ))
                                    }
                                    <th colSpan={3}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    getTable().map((IPDPatient, index) => (
                                        <tr key={index}>
                                            {
                                                Object.keys(IPDPatient).map((property, index) => (
                                                    <td key={index}>{IPDPatient[property].toString()}</td>
                                                ))
                                            }
                                            <td>
                                                <Link to={`/IPDPatient/Edit/${IPDPatient.id}`} state={IPDPatient}>
                                                    <button className="btn btn-warning">Edit</button>
                                                </Link>
                                            </td>
                                            <td>
                                                <button className="btn btn-danger" onClick={() => deleteIPDPatient(IPDPatient)}>Delete</button>
                                            </td>
                                            {
                                                !IPDPatient.discharged ?
                                                    <td>
                                                        <Link to={`/IPDPatient/Discharge/${IPDPatient.id}`} state={IPDPatient}>
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

export default IPDPatient;