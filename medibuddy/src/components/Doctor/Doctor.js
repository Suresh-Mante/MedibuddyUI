import React, { useState, useEffect } from "react"
import { DOCTOR_API } from "../Env";
import AppTitle from "../Header/AppTitle";
import { pascalCase } from "../Utils";
import { getDataFromServer } from '../DataAccess';
import { Link, Route, Routes } from "react-router-dom";
import CreateEntityDoctor from "./CreateEntityDoctor";

const Doctor = () => {
    const [state, setState] = useState({
        doctors: null
    });
    const getDoctors = async () => {
        //use DoctorAPI.Get
        const response = await getDataFromServer(DOCTOR_API, 'GET');
        if (response) {
            if (response.statusCode == 200) {
                const doctors = response.records;
                //update state with new doctors
                setState({
                    ...state,
                    doctors: doctors
                })
            } else {
                //handle 404/400/500 errors here
            }
        } else {
            //no internet connection/connection refused
        }
    }
    const deleteDoctor = async(deleted_doctor) => {
        //use DoctorAPI.Delete
        const response = await getDataFromServer(`${DOCTOR_API}/?id=${deleted_doctor.id}`, 'DELETE');
        if (response) {
            if (response.statusCode == 200) {
                const deleted_doctor = response.record;
                setState({
                    ...state,
                    doctors: state.doctors.filter((doctor) => {
                        return doctor.id != deleted_doctor.id
                    })
                })
            } else {
            }
        } else {
        }
    }
    useEffect(() => {
        if (state.doctors == null) {
            getDoctors();
        }
    }, []);
    return (
        <>
            <div className="flex flex-align-center" style={{
                gap: "10px",
                paddingTop: '3px'
            }}>
                <AppTitle title={'Doctor Dashboard'} />
                <Link to='/Doctor/Create'>
                    <button className="btn btn-primary">Add new Doctor</button>
                </Link>
            </div>
            {
                state.doctors != null && state.doctors.length > 0
                    ?
                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                {
                                    Object.keys(state.doctors[0]).map((property, index) => (
                                        <th key={index}>{pascalCase(property)}</th>
                                    ))
                                }
                                <th colSpan={2}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                state.doctors.map((doctor, index) => (
                                    <tr key={index}>
                                        {
                                            Object.keys(doctor).map((property, index) => (
                                                <td key={index}>{doctor[property]}</td>
                                            ))
                                        }
                                        <td>
                                            <Link to={`/Doctor/Edit/${doctor.id}`} state={doctor}>
                                                <button className="btn btn-warning">Edit</button>
                                            </Link>
                                        </td>
                                        <td>
                                            <button className="btn btn-danger" onClick={() => deleteDoctor(doctor)}>Delete</button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    :
                    <div>No Doctor records</div>
            }
        </>
    );
}

export default Doctor;