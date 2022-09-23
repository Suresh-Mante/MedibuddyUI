import React, { useState, useEffect } from "react"
import { IPDMEDICINE_API } from "../Env";
import AppTitle from "../Header/AppTitle";
import { pascalCase } from "../Utils";
import { getDataFromServer } from '../DataAccess';
import { Link, Route, Routes } from "react-router-dom";
import CreateEntityIPDMedicine from "./CreateEntityIPDMedicine.js"
import Search from "../Shared/Search";
import Loading from '../Shared/Loading';

const IPDMedicine = () => {
    const [state, setState] = useState({
        ipdmedicines: null,
        filters: {
            searchBy: null,
            searchText: ''
        }
    });
    const getIPDMedicines = async () => {
        //use IPDMedicineAPI.Get
        const response = await getDataFromServer(IPDMEDICINE_API, 'GET');
        if (response) {
            if (response.statusCode == 200) {
                const ipdmedicines = response.records;
                //update state with new ipdmedicines
                setState({
                    ...state,
                    ipdmedicines: ipdmedicines
                })
            } else {
                //handle 404/400/500 errors here
            }
        } else {
            //no internet connection/connection refused
        }
    }
    const deleteIPDMedicine = async(deleted_ipdmedicine) => {
        //use IPDMedicineAPI.Delete
        const response = await getDataFromServer(`${IPDMEDICINE_API}/?ipdPatientID=${deleted_ipdmedicine.IPDPatientID}`, 'DELETE');
        if (response) {
            if (response.statusCode == 200) {
                const deleted_ipdmedicine = response.record;
                setState({
                    ...state,
                    ipdmedicines: state.ipdmedicines.filter((ipdmedicine) => {
                        return ipdmedicine.IPDPatientID != deleted_ipdmedicine.IPDPatientID
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
            return state.ipdmedicines.filter((ipdmedicine) => ipdmedicine[state.filters.searchBy]
                .toString().toLowerCase().includes(state.filters.searchText.toLowerCase()));
        }
        else return state.ipdmedicines;
    }
    useEffect(() => {
        if (state.ipdmedicines == null) {
            getIPDMedicines();
        }
    }, []);
    return (
        <>
            <div className="flex flex-align-center" style={{
                gap: "10px",
                paddingTop: '3px'
            }}>
                <AppTitle title={'IPDMedicine Dashboard'} />
                <Link to='/IPDMedicine/Create'>
                    <button className="btn btn-primary">Add new IPDMedicine</button>
                </Link>
            </div>
            {
                state.ipdmedicines != null && state.ipdmedicines.length > 0
                    ?
                    <>
                        <Search dataSource={Object.keys(state.ipdmedicines[0])} filterTable={updateTableByFilters} />
                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                {
                                    Object.keys(state.ipdmedicines[0]).map((property, index) => (
                                        <th key={index}>{pascalCase(property)}</th>
                                    ))
                                }
                                
                            </tr>
                        </thead>
                        <tbody>
                            {
                                getTable().map((ipdmedicine, index) => (
                                    <tr key={index}>
                                        {
                                            Object.keys(ipdmedicine).map((property, index) => (
                                                <td key={index}>{ipdmedicine[property]}</td>
                                            ))
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

export default IPDMedicine;