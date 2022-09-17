import React, { useState, useEffect } from "react"
import { DOCTOR_API } from "../Env";
import AppTitle from "../Header/AppTitle";
import { pascalCase } from "../Utils";
import {getDataFromServer} from  '../DataAccess';
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
    useEffect(() => {
        if (state.doctors == null) {
            getDoctors();
        }
    }, []);
    return (
        <>
            <AppTitle title={'Doctor Dashboard'} />
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