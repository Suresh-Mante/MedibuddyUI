import React, { useState, useEffect } from "react"
import { WARD_API } from "../Env";
import AppTitle from "../Header/AppTitle";
import { pascalCase } from "../Utils";
import {getDataFromServer} from  '../DataAccess';

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
    useEffect(() => {
        if (state.wards == null) {
            getWards();
        }
    }, []);
    return (
        <>
            <AppTitle title={'Ward Dashboard'} />
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