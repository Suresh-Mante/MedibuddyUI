import React, { useState, useEffect } from "react"
import { Department_API } from "../Env";
import AppTitle from "../Header/AppTitle";
import { pascalCase } from "../Utils";
import { getDataFromServer } from '../DataAccess';
import { Link, Route, Routes } from "react-router-dom";
import CreateEntityDepartment from "./CreateEntityDepartment";

const Department = () => {
    const [state, setState] = useState({
        departments: null
    });
    const getDepartments = async () => {
        //use DepartmentAPI.Get
        const response = await getDataFromServer(Department_API, 'GET');
        if (response) {
            if (response.statusCode == 200) {
                const departments = response.records;
                //update state with new departments
                setState({
                    ...state,
                    departments: departments
                })
            } else {
                //handle 404/400/500 errors here
            }
        } else {
            //no internet connection/connection refused
        }
    }
    const deleteDepartment = async(deleted_department) => {
        //use DepartmentAPI.Delete
        const response = await getDataFromServer(`${Department_API}/?depID=${deleted_department.depID}`, 'DELETE');
        if (response) {
            if (response.statusCode == 200) {
                const deleted_department = response.record;
                setState({
                    ...state,
                    departments: state.departments.filter((department) => {
                        return department.depID != deleted_department.depID
                    })
                })
            } else {
                alert(`response ${response.statusCode}`);
            }
        } else {
        }
    }
    useEffect(() => {
        if (state.departments == null) {
            getDepartments();
        }
    }, []);
    return (
        <>
            <div className="flex flex-align-center" style={{
                gap: "10px",
                paddingTop: '3px'
            }}>
                <AppTitle title={'Department Dashboard'} />
                <Link to='/Department/Create'>
                    <button className="btn btn-primary">Add new Department</button>
                </Link>
            </div>
            {
                state.departments != null && state.departments.length > 0
                    ?
                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                {
                                    Object.keys(state.departments[0]).map((property, index) => (
                                        <th key={index}>{pascalCase(property)}</th>
                                    ))
                                }
                                <th colSpan={2}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                state.departments.map((department, index) => (
                                    <tr key={index}>
                                        {
                                            Object.keys(department).map((property, index) => (
                                                <td key={index}>{department[property]}</td>
                                            ))
                                        }
                                        <td>
                                            <Link to={`/Department/Edit/${department.depID}`} state={department}>
                                                <button className="btn btn-warning">Edit</button>
                                            </Link>
                                        </td>
                                        <td>
                                            <button className="btn btn-danger" onClick={() => deleteDepartment(department)}>Delete</button>
                                        </td>
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