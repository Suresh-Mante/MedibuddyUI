import React, { useState, useEffect } from "react"
import { MEDICINE_API } from "../Env";
import AppTitle from "../Header/AppTitle";
import { pascalCase } from "../Utils";
import {getDataFromServer} from  '../DataAccess';

import { Link, Route, Routes } from "react-router-dom";
import CreateEntityMedicine from "./CreateEntityMedicine";

const Medicine = () => {
    const [state, setState] = useState({
        medicines: null
    });
    const getMedicines = async () => {
        //use MEDICINEAPI.Get
        const response = await getDataFromServer(MEDICINE_API, 'GET');
        if (response) {
            if (response.statusCode == 200) {
                const medicines = response.records;
                //update state with new medicines
                setState({
                    ...state,
                    medicines: medicines
                })
            } else {
                //handle 404/400/500 errors here
            }
        } else {
            //no internet connection/connection refused
        }
    }

    const deleteMedicine = async(deleted_medicine) => {
        //use MEDICINEAPI.Delete
        const response = await getDataFromServer(`${MEDICINE_API}/?id=${deleted_medicine.id}`, 'DELETE');
        if (response) {
            if (response.statusCode == 200) {
                const deleted_medicine = response.record;
                setState({
                    ...state,
                    medicines: state.medicines.filter((medicine) => {
                        return medicine.id != deleted_medicine.id
                    })
                })
            } else {
            }
        } else {
        }
    }

    useEffect(() => {
        if (state.medicines == null) {
            getMedicines();
        }
    }, []);
    return (
        <>
           <div className="flex flex-align-center" style={{
                gap: "10px",
                paddingTop: '3px'
            }}>
                <AppTitle title={'Medicine Dashboard'} />
                <Link to='/Medicine/Create'>
                    <button className="btn btn-primary">Add new Medicine</button>
                </Link>
            </div>
            {
                state.medicines != null && state.medicines.length > 0
                    ?
                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                {
                                    Object.keys(state.medicines[0]).map((property, index) => (
                                        <th key={index}>{pascalCase(property)}</th>
                                    ))
                                }
                                <th colSpan={2}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                state.medicines.map((medicine, index) => (
                                    <tr key={index}>
                                        {
                                            Object.keys(medicine).map((property, index) => (
                                                <td key={index}>{medicine[property]}</td>
                                            ))
                                        }
                                        <td>
                                            <Link to={`/Medicine/Edit/${medicine.id}`} state={medicine}>
                                                <button className="btn btn-warning">Edit</button>
                                            </Link>
                                        </td>
                                        <td>
                                            <button className="btn btn-danger" onClick={() => deleteMedicine(medicine)}>Delete</button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    :
                    <div>No Medicine records</div>
            }
        </>
    );
}

export default Medicine;
