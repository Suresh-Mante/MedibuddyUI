import React, { useState, useEffect } from "react"
import { WARD_API } from "../Env";
import AppTitle from "../Header/AppTitle";
import { pascalCase } from "../Utils";
import { getDataFromServer } from '../DataAccess';
import { Link, Route, Routes } from "react-router-dom";

const Ward = () => {
    const [state, setState] = useState({
        wards: null
    });
    const getWards = async () => {
        //use WardAPI.Get
        const response = await getDataFromServer(WARD_API, 'GET');
        if (response) {
            if (response.statusCode == 200) {
                const wards = response.records;
                //update state with new wards
                setState({
                    ...state,
                    wards: wards
                })
            } else {
                //handle 404/400/500 errors here
            }
        } else {
            //no internet connection/connection refused
        }
    }
    const deleteWard = async(deleted_ward) => {
        //use WardAPI.Delete
        const response = await getDataFromServer(`${WARD_API}/?id=${deleted_ward.id}`, 'DELETE');
        if (response) {
            if (response.statusCode == 200) {
                const deleted_ward = response.record;
                setState({
                    ...state,
                    wards: state.wards.filter((ward) => {
                        return ward.id != deleted_ward.id
                    })
                })
            } else {
            }
        } else {
        }
    }
    useEffect(() => {
        if (state.wards == null) {
            getWards();
        }
    }, []);
    return (
        <>
            <div className="flex flex-align-center" style={{
                gap: "10px",
                paddingTop: '3px'
            }}>
                <AppTitle title={'Ward Dashboard'} />
                <Link to='/Ward/Create'>
                    <button className="btn btn-primary">Add new Ward</button>
                </Link>
            </div>
            {
                state.wards != null && state.wards.length > 0
                    ?
                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                {
                                    Object.keys(state.wards[0]).map((property, index) => (
                                        <th key={index}>{pascalCase(property)}</th>
                                    ))
                                }
                                <th colSpan={2}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                state.wards.map((ward, index) => (
                                    <tr key={index}>
                                        {
                                            Object.keys(ward).map((property, index) => (
                                                <td key={index}>{ward[property]}</td>
                                            ))
                                        }
                                        <td>
                                            <Link to={`/Ward/Edit/${ward.id}`} state={ward}>
                                                <button className="btn btn-warning">Edit</button>
                                            </Link>
                                        </td>
                                        <td>
                                            <button className="btn btn-danger" onClick={() => deleteWard(ward)}>Delete</button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    :
                    <div>No ward records</div>
            }
        </>
    );
}

export default Ward;