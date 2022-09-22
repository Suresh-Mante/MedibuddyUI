import React, { useState, useEffect } from "react"
import { MEDICINE_API } from "../Env";
import AppTitle from "../Header/AppTitle";
import { pascalCase } from "../Utils";
import { getDataFromServer } from '../DataAccess';
import { Link, Route, Routes } from "react-router-dom";
import CreateEntityMedicine from "./CreateEntityMedicine";
import Search from "../Shared/Search";
import Loading from '../Shared/Loading';

const Medicine = () => {
    const [state, setState] = useState({
        medicines: null,
        filters: {
            searchBy: null,
            searchText: ''
        }
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

    const deleteMedicine = async (deleted_medicine) => {
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
            return state.medicines.filter((medicine) => medicine[state.filters.searchBy]
                .toString().toLowerCase().includes(state.filters.searchText.toLowerCase()));
        }
        else return state.medicines;
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
                    <>
                        <Search dataSource={Object.keys(state.medicines[0])} filterTable={updateTableByFilters} />
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
                                    getTable().map((medicine, index) => (
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

export default Medicine;
