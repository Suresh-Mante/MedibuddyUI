import React, { useState, useEffect } from "react"
import { NURSE_API } from "../Env";
import AppTitle from "../Header/AppTitle";
import { pascalCase } from "../Utils";
import { getDataFromServer } from '../DataAccess';
import { Link, Route, Routes } from "react-router-dom";
import CreateEntityNurse from "./CreateEntityNurse";
import Search from "../Shared/Search";
import Loading from '../Shared/Loading';

const Nurse = () => {
    const [state, setState] = useState({
        nurses: null,
        filters: {
            searchBy: null,
            searchText: ''
        }
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
    const deletenurse = async (deleted_nurse) => {
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
            return state.nurses.filter((nurse) => nurse[state.filters.searchBy]
                .toString().toLowerCase().includes(state.filters.searchText.toLowerCase()));
        }
        else return state.nurses;
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
                    <>
                        <Search dataSource={Object.keys(state.nurses[0])} filterTable={updateTableByFilters} />
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
                                    getTable().map((nurse, index) => (
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

export default Nurse;