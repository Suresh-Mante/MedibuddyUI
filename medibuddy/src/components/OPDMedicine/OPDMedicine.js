import React, { useState, useEffect } from "react"
import { OPDMEDICINE_API } from "../Env";
import AppTitle from "../Header/AppTitle";
import { pascalCase } from "../Utils";
import { getDataFromServer } from '../DataAccess';
import { Link, Route, Routes } from "react-router-dom";
import CreateEntityOPDMedicine from "./CreateEntityOPDMedicine.js"

const OPDMedicine = () => {
    const [state, setState] = useState({
        opdmedicines: null
    });
    const getOPDMedicines = async () => {
        //use OPDMedicineAPI.Get
        const response = await getDataFromServer(OPDMEDICINE_API, 'GET');
        if (response) {
            if (response.statusCode == 200) {
                const opdmedicines = response.records;
                //update state with new opdmedicines
                setState({
                    ...state,
                    opdmedicines: opdmedicines
                })
            } else {
                //handle 404/400/500 errors here
            }
        } else {
            //no internet connection/connection refused
        }
    }
    const deleteOPDMedicine = async(deleted_opdmedicine) => {
        //use OPDMedicineAPI.Delete
        const response = await getDataFromServer(`${OPDMEDICINE_API}/?opdBillingID=${deleted_opdmedicine.OPDBillingID}`, 'DELETE');
        if (response) {
            if (response.statusCode == 200) {
                const deleted_opdmedicine = response.record;
                setState({
                    ...state,
                    opdmedicines: state.opdmedicines.filter((opdmedicine) => {
                        return opdmedicine.OPDBillingID != deleted_opdmedicine.OPDBillingID
                    })
                })
            } else {
            }
        } else {
        }
    }
    useEffect(() => {
        if (state.opdmedicines == null) {
            getOPDMedicines();
        }
    }, []);
    return (
        <>
            <div className="flex flex-align-center" style={{
                gap: "10px",
                paddingTop: '3px'
            }}>
                <AppTitle title={'OPDMedicine Dashboard'} />
                <Link to='/OPDMedicine/Create'>
                    <button className="btn btn-primary">Add new OPDMedicine</button>
                </Link>
            </div>
            {
                state.opdmedicines != null && state.opdmedicines.length > 0
                    ?
                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                {
                                    Object.keys(state.opdmedicines[0]).map((property, index) => (
                                        <th key={index}>{pascalCase(property)}</th>
                                    ))
                                }
                                
                            </tr>
                        </thead>
                        <tbody>
                            {
                                state.opdmedicines.map((opdmedicine, index) => (
                                    <tr key={index}>
                                        {
                                            Object.keys(opdmedicine).map((property, index) => (
                                                <td key={index}>{opdmedicine[property]}</td>
                                            ))
                                        }
                                        {/*
                                        <td>
                                            <Link to={`/OPDMedicine/Edit/${opdmedicine.opdBillingID}`} state={opdmedicine}>
                                                <button className="btn btn-warning">Edit</button>
                                            </Link>
                                        </td>
                                        <td>
                                            <button className="btn btn-danger" onClick={() => deleteOPDMedicine(opdmedicine)}>Delete</button>
                                        </td>
                                    */}
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    :
                    <div>No OPDMedicine records</div>
            }
        </>
    );
}

export default OPDMedicine;