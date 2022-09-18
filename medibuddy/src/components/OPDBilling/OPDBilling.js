import React, { useState, useEffect } from "react"
import { OPDBilling_API } from "../Env";
import AppTitle from "../Header/AppTitle";
import { pascalCase } from "../Utils";
import { getDataFromServer } from '../DataAccess';
import { Link, Route, Routes } from "react-router-dom";
import CreateEntityOPDBilling from "./CreateEntityOPDBilling";

const OPDBilling = () => {
    const [state, setState] = useState({
        opdbillings: null
    });
    const getOPDBillings = async () => {
        //use OPDBillingAPI.Get
        const response = await getDataFromServer(OPDBilling_API, 'GET');
        if (response) {
            if (response.statusCode == 200) {
                const opdbillings = response.records;
                //update state with new opdbillings
                setState({
                    ...state,
                    opdbillings: opdbillings
                })
            } else {
                //handle 404/400/500 errors here
            }
        } else {
            //no internet connection/connection refused
        }
    }
    const deleteOPDBilling = async(deleted_opdbilling) => {
        //use OPDBillingAPI.Delete
        const response = await getDataFromServer(`${OPDBilling_API}/?id=${deleted_opdbilling.id}`, 'DELETE');
        if (response) {
            if (response.statusCode == 200) {
                const deleted_opdbilling = response.record;
                setState({
                    ...state,
                    opdbillings: state.opdbillings.filter((opdbilling) => {
                        return opdbilling.id != deleted_opdbilling.id
                    })
                })
            } else {
                alert(`response ${response.statusCode}`);
            }
        } else {
        }
    }
    useEffect(() => {
        if (state.opdbillings == null) {
            getOPDBillings();
        }
    }, []);
    return (
        <>
            <div className="flex flex-align-center" style={{
                gap: "10px",
                paddingTop: '3px'
            }}>
                <AppTitle title={'OPDBilling Dashboard'} />
                <Link to='/OPDBilling/Create'>
                    <button className="btn btn-primary">Add new OPDBilling</button>
                </Link>
            </div>
            {
                state.opdbillings != null && state.opdbillings.length > 0
                    ?
                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                {
                                    Object.keys(state.opdbillings[0]).map((property, index) => (
                                        <th key={index}>{pascalCase(property)}</th>
                                    ))
                                }
                                <th colSpan={2}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                state.opdbillings.map((opdbilling, index) => (
                                    <tr key={index}>
                                        {
                                            Object.keys(opdbilling).map((property, index) => (
                                                <td key={index}>{opdbilling[property]}</td>
                                            ))
                                        }
                                        <td>
                                            <Link to={`/OPDBilling/Edit/${opdbilling.id}`} state={opdbilling}>
                                                <button className="btn btn-warning">Edit</button>
                                            </Link>
                                        </td>
                                        <td>
                                            <button className="btn btn-danger" onClick={() => deleteOPDBilling(opdbilling)}>Delete</button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    :
                    <div>No OPDBilling records</div>
            }
        </>
    );
}

export default OPDBilling;