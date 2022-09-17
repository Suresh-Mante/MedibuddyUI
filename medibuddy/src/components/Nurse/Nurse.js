import React, { useState, useEffect } from "react"
import { Nurse_API } from "../Env";
import AppTitle from "../Header/AppTitle";
import { pascalCase } from "../Utils";
import {getDataFromServer} from  '../DataAccess';
const Nurse = () => {
    const [state, setState] = useState({
        nurses: null
    });
    const getNurses = async () => {
        //use NurseAPI.Get
        const response = await getDataFromServer(Nurse_API, 'GET');
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
    useEffect(() => {
        if (state.nurses == null) {
            getNurses();
        }
    }, []);
    return (
        <>
            <AppTitle title={'Nurse Dashboard'} />
            {
                state.nurses != null && state.nurses.length > 0
                    ?
                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                {
                                    Object.keys(state.nurses[0]).map((property, index) => (
                                        <th key={index}>{pascalCase(property)}</th>
                                    ))
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {
                                state.nurses.map((nurse, index) => (
                                    <tr key={index}>
                                        {
                                            Object.keys(nurse).map((property, index) => (
                                                <td key={index}>{nurse[property]}</td>
                                            ))
                                        }
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    :
                    <div>No Nurse records</div>
            }
        </>
    );
}

export default Nurse;