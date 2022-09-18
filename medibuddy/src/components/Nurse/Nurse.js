import React, { useState, useEffect } from "react"
import { NURSE_API } from "../Env";
import AppTitle from "../Header/AppTitle";
import { pascalCase } from "../Utils";
import { getDataFromServer } from '../DataAccess';
import { Link, Route, Routes } from "react-router-dom";
import CreateEntityNurse from "./CreateEntityNurse";

const Nurse = () => {
    const [state, setState] = useState({
        nurses: null
    });
    const getNurses = async () => {
        //use NurseAPI.Get
        const response = await getDataFromServer(NURSE_API, 'GET');
        if (response) {
            if (response.statusCode == 200) {
                const nurses = response.records;
                //update state with new nurses
                setState({
                    ...state,
                    nurses: nurses
                })
            } else {
                //handle 404/400/500 errors here
            }
        } else {
            //no internet connection/connection refused
        }
    }
    const deletenurse = async(deleted_nurse) => {
        //use NurseAPI.Delete
        const response = await getDataFromServer(`${NURSE_API}/?id=${deleted_nurse.id}`, 'DELETE');
        if (response) {
            if (response.statusCode == 200) {
                const deleted_nurse = response.record;
                setState({
                    ...state,
                    nurses: state.nurses.filter((nurse) => {
                        return nurse.id != deleted_nurse.id
                    })
                })
            } else {
            }
        } else {
        }
    }
    useEffect(() => {
        if (state.nurses == null) {
            getNurses();
        }
    }, []);
    return (
        <>
            <div className="flex flex-align-center" style={{
                gap: "10px",
                paddingTop: '3px'
            }}>
                <AppTitle title={'Nurse Dashboard'} />
                <Link to='/Nurse/Create'>
                    <button className="btn btn-primary">Add new Nurse</button>
                </Link>
            </div>
            {
                state.nurses != null && state.nurses.length > 0
                    ?
                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                {
                                    Object.keys(state.nurses[0]).map((property, index) => (
                                        <th key={index}>{pascalCase(property)}</th>
                                    ))
                                }
                                <th colSpan={2}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                state.nurses.map((nurse, index) => (
                                    <tr key={index}>
                                        {
                                            Object.keys(nurse).map((property, index) => (
                                                <td key={index}>{nurse[property]}</td>
                                            ))
                                        }
                                        <td>
                                            <Link to={`/Nurse/Edit/${nurse.id}`} state={nurse}>
                                                <button className="btn btn-warning">Edit</button>
                                            </Link>
                                        </td>
                                        <td>
                                            <button className="btn btn-danger" onClick={() => deletenurse(nurse)}>Delete</button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    :
                    <div>No Nurse records</div>
            }
        </>
    );
}

export default Nurse;