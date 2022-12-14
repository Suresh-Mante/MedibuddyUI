import React, { useState, useEffect } from "react"
import { ROOM_API } from "../Env";
import AppTitle from "../Header/AppTitle";
import { pascalCase } from "../Utils";
import { getDataFromServer } from '../DataAccess';
import { Link, Route, Routes } from "react-router-dom";
import Search from "../Shared/Search";
import Loading from '../Shared/Loading';

const Room = () => {
    const [state, setState] = useState({
        rooms: null,
        filters: {
            searchBy: null,
            searchText: ''
        }
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
    const deleteRoom = async(deleted_room) => {
        //use RoomAPI.Delete
        const response = await getDataFromServer(`${ROOM_API}/?id=${deleted_room.id}`, 'DELETE');
        if (response) {
            if (response.statusCode == 200) {
                const deleted_room = response.record;
                setState({
                    ...state,
                    rooms: state.rooms.filter((room) => {
                        return room.id != deleted_room.id
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
            return state.rooms.filter((room) => room[state.filters.searchBy]
                .toString().toLowerCase().includes(state.filters.searchText.toLowerCase()));
        }
        else return state.rooms;
    }
    useEffect(() => {
        if (state.rooms == null) {
            getRooms();
        }
    }, []);
    return (
        <>
            <div className="flex flex-align-center" style={{
                gap: "10px",
                paddingTop: '3px'
            }}>
                <AppTitle title={'Room Dashboard'} />
                <Link to='/Room/Create'>
                    <button className="btn btn-primary">Add new Room</button>
                </Link>
            </div>
            {
                state.rooms != null && state.rooms.length > 0
                    ?
                    <>
                        <Search dataSource={Object.keys(state.rooms[0])} filterTable={updateTableByFilters} />
                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                {
                                    Object.keys(state.rooms[0]).map((property, index) => (
                                        <th key={index}>{pascalCase(property)}</th>
                                    ))
                                }
                                <th colSpan={2}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                getTable().map((room, index) => (
                                    <tr key={index}>
                                        {
                                            Object.keys(room).map((property, index) => (
                                                <td key={index}>{room[property]}</td>
                                            ))
                                        }
                                        <td>
                                            <Link to={`/Room/Edit/${room.id}`} state={room}>
                                                <button className="btn btn-warning">Edit</button>
                                            </Link>
                                        </td>
                                        <td>
                                            <button className="btn btn-danger" onClick={() => deleteRoom(room)}>Delete</button>
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

export default Room;