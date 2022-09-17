import React, { useState, useEffect } from "react"
import { OPDMEDICINE_API } from "../Env";
import AppTitle from "../Header/AppTitle";
import { pascalCase } from "../Utils";
import {getDataFromServer} from  '../DataAccess';
const OPDMedicine = () => {
    const [state, setState] = useState({
        opdmedicines: null
    });
    const getOPDMedicines = async () => {
        //use OPDMEDICINEAPI.Get
        const response = await getDataFromServer(OPDMEDICINE_API, 'GET');
        if (response) {
            if (response.statusCode == 200) {
                const opdmedicines = response.records;
                //update state with new opdmedicines
                setState({
                    ...state,
                    opdmedicines: opdmedicines
                })
            } else {
                //handle 404/400/500 errors here
            }
        } else {
            //no internet connection/connection refused
        }
    }
    useEffect(() => {
        if (state.opdmedicines == null) {
            getOPDMedicines();
        }
    }, []);
    return (
        <>
            <AppTitle title={'OPDMedicine Dashboard'} />
            {
                state.opdmedicines != null && state.opdmedicines.length > 0
                    ?
                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                {
                                    Object.keys(state.opdmedicines[0]).map((property, index) => (
                                        <th key={index}>{pascalCase(property)}</th>
                                    ))
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {
                                state.opdmedicines.map((opdmedicine, index) => (
                                    <tr key={index}>
                                        {
                                            Object.keys(opdmedicine).map((property, index) => (
                                                <td key={index}>{opdmedicine[property]}</td>
                                            ))
                                        }
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    :
                    <div>No OPDMedicine records</div>
            }
        </>
    );
}

export default OPDMedicine;
