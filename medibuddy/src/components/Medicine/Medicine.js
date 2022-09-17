import React, { useState, useEffect } from "react"
import { MEDICINE_API } from "../Env";
import AppTitle from "../Header/AppTitle";
import { pascalCase } from "../Utils";
import {getDataFromServer} from  '../DataAccess';
const Medicine = () => {
    const [state, setState] = useState({
        medicines: null
    });
    const getMedicines = async () => {
        //use MEDICINEAPI.Get
        const response = await getDataFromServer(MEDICINE_API, 'GET');
        if (response) {
            if (response.statusCode == 200) {
                const medicines = response.records;
                //update state with new tests
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
    useEffect(() => {
        if (state.medicines == null) {
            getMedicines();
        }
    }, []);
    return (
        <>
            <AppTitle title={'Medicine Dashboard'} />
            {
                state.medicines != null && state.medicines.length > 0
                    ?
                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                {
                                    Object.keys(state.medicines[0]).map((property, index) => (
                                        <th key={index}>{pascalCase(property)}</th>
                                    ))
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {
                                state.medicines.map((medicine, index) => (
                                    <tr key={index}>
                                        {
                                            Object.keys(medicine).map((property, index) => (
                                                <td key={index}>{medicine[property]}</td>
                                            ))
                                        }
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    :
                    <div>No Medicine records</div>
            }
        </>
    );
}

export default Medicine;
