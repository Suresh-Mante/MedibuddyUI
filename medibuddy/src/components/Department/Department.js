import React, { useState, useEffect } from "react"
import { Department_API } from "../Env";
import AppTitle from "../Header/AppTitle";
import { pascalCase } from "../Utils";
import {getDataFromServer} from  '../DataAccess';

const Department = () => {
    const [state, setState] = useState({
        Departments: null
    });
    const getDepartments = async () => {
        //use DepartmentAPI.Get
        const response = await getDataFromServer(Department_API, 'GET');
        if (response) {
            if (response.statusCode == 200) {
                const Departments = response.records;
                //update state with new Departments
                setState({
                    ...state,
                    Departments: Departments
                })
            } else {
                //handle 404/400/500 errors here
            }
        } else {
            //no internet connection/connection refused
        }
    }
    useEffect(() => {
        if (state.Departments == null) {
            getDepartments();
        }
    }, []);
    return (
        <>
            <AppTitle title={'Department Dashboard'} />
            {
                state.Departments != null && state.Departments.length > 0
                    ?
                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                {
                                    Object.keys(state.Departments[0]).map((property, index) => (
                                        <th key={index}>{pascalCase(property)}</th>
                                    ))
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {
                                state.Departments.map((Department, index) => (
                                    <tr key={index}>
                                        {
                                            Object.keys(Department).map((property, index) => (
                                                <td key={index}>{Department[property]}</td>
                                            ))
                                        }
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    :
                    <div>No Department records</div>
            }
        </>
    );
}

export default Department;