import React, { useState, useEffect } from "react"
import { OPDTest_API } from "../Env";
import AppTitle from "../Header/AppTitle";
import { pascalCase } from "../Utils";
import { getDataFromServer } from '../DataAccess';
import { Link, Route, Routes } from "react-router-dom";
import CreateEntityOPDTest from "./CreateEntityOPDTest.js"
import Search from "../Shared/Search";
import Loading from '../Shared/Loading';

const OPDTest = () => {
    const [state, setState] = useState({
        opdtests: null,
        filters: {
            searchBy: null,
            searchText: ''
        }
    });
    const getOPDTests = async () => {
        //use OPDTestAPI.Get
        const response = await getDataFromServer(OPDTest_API, 'GET');
        if (response) {
            if (response.statusCode == 200) {
                const opdtests = response.records;
                //update state with new opdtests
                setState({
                    ...state,
                    opdtests: opdtests
                })
            } else {
                //handle 404/400/500 errors here
            }
        } else {
            //no internet connection/connection refused
        }
    }
    const deleteOPDTest = async (deleted_opdtest) => {
        //use OPDTestAPI.Delete
        const response = await getDataFromServer(`${OPDTest_API}/?opdBillingID=${deleted_opdtest.OPDBillingID}`, 'DELETE');
        if (response) {
            if (response.statusCode == 200) {
                const deleted_opdtest = response.record;
                setState({
                    ...state,
                    opdtests: state.opdtests.filter((opdtest) => {
                        return opdtest.OPDBillingID != deleted_opdtest.OPDBillingID
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
            return state.opdtests.filter((opdtest) => opdtest[state.filters.searchBy]
                .toString().toLowerCase().includes(state.filters.searchText.toLowerCase()));
        }
        else return state.opdtests;
    }
    useEffect(() => {
        if (state.opdtests == null) {
            getOPDTests();
        }
    }, []);
    return (
        <>
            <div className="flex flex-align-center" style={{
                gap: "10px",
                paddingTop: '3px'
            }}>
                <AppTitle title={'OPDTest Dashboard'} />
                <Link to='/OPDTest/Create'>
                    <button className="btn btn-primary">Add new OPDTest</button>
                </Link>
            </div>
            {
                state.opdtests != null && state.opdtests.length > 0
                    ?
                    <>
                        <Search dataSource={Object.keys(state.opdtests[0])} filterTable={updateTableByFilters} />
                        <table className="table table-bordered table-striped">
                            <thead>
                                <tr>
                                    {
                                        Object.keys(state.opdtests[0]).map((property, index) => (
                                            <th key={index}>{pascalCase(property)}</th>
                                        ))
                                    }

                                </tr>
                            </thead>
                            <tbody>
                                {
                                    getTable().map((opdtest, index) => (
                                        <tr key={index}>
                                            {
                                                Object.keys(opdtest).map((property, index) => (
                                                    <td key={index}>{opdtest[property]}</td>
                                                ))
                                            }
                                            {/*
                                        <td>
                                            <Link to={`/OPDTest/Edit/${opdtest.opdBillingID}`} state={opdtest}>
                                                <button className="btn btn-warning">Edit</button>
                                            </Link>
                                        </td>
                                        <td>
                                            <button className="btn btn-danger" onClick={() => deleteOPDTest(opdtest)}>Delete</button>
                                        </td>
                                    */}
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

export default OPDTest;