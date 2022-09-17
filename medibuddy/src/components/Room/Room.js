import React, { useState, useEffect } from "react"
import { ROOM_API } from "../Env";
import AppTitle from "../Header/AppTitle";
import { pascalCase } from "../Utils";
import {getDataFromServer} from  '../DataAccess';

const Room = () => {
    const [state, setState] = useState({
        rooms: null
    });
    const getRooms = async () => {
        //use RoomAPI.Get
        const response = await getDataFromServer(ROOM_API, 'GET');
        if (response) {
            if (response.statusCode == 200) {
                const rooms = response.records;
                //update state with new rooms
                setState({
                    ...state,
                    rooms: rooms
                })
            } else {
                //handle 404/400/500 errors here
            }
        } else {
            //no internet connection/connection refused
        }
    }
    useEffect(() => {
        if (state.rooms == null) {
            getRooms();
        }
    }, []);
    return (
        <>
            <AppTitle title={'Room Dashboard'} />
            {
                state.rooms != null && state.rooms.length > 0
                    ?
                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                {
                                    Object.keys(state.rooms[0]).map((property, index) => (
                                        <th key={index}>{pascalCase(property)}</th>
                                    ))
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {
                                state.rooms.map((room, index) => (
                                    <tr key={index}>
                                        {
                                            Object.keys(room).map((property, index) => (
                                                <td key={index}>{room[property]}</td>
                                            ))
                                        }
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    :
                    <div>No room records</div>
            }
        </>
    );
}

export default Room;