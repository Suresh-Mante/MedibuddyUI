import React, { useState, useEffect } from "react";
import { getDataFromServer } from "../DataAccess";
import { BASE_API, ROOM_API } from "../Env";
import Select from '../Shared/Select';
import { getOptionsArray } from "../Utils";
import Loading from '../Shared/Loading';
import { Link, useLocation } from "react-router-dom";

const CreateEntity = (props) => {
    //for editing
    let existing_room = null;
    const location = useLocation();
    if (props.editing) {
        existing_room = location.state;
    }
    const roomTypes = ['General', 'Shared', 'Special'];
    const [state, setState] = useState({
        room: {
            wardId: existing_room ? existing_room.wardId : null,
            type: existing_room ? existing_room.type : null,
            rate: existing_room ? existing_room.rate : 0,
            currentBedCapacity: existing_room ? existing_room.currentBedCapacity : 0,
            maxBedCapacity: existing_room ? existing_room.maxBedCapacity : 0,
        },
        wards: null,
        validationErrors: [],
        creating: false,
        errors: [],
        messages: [],
        updating: false
    });
    const getWards = async () => {
        const response = await getDataFromServer(BASE_API + 'ward', 'GET');
        if (response) {
            if (response.statusCode == 200) {
                const wards = response.records;
                setState({
                    ...state,
                    wards: wards
                });
            } else {
                setState({
                    ...state,
                    errors: [response.message]
                });
            }
        } else {
            setState({
                ...state,
                errors: ['Check your internet connection']
            });
        }
    }
    const updateWard = (wardId) => {
        const ward = state.wards.filter((ward) => {
            return ward.id == wardId;
        })[0];
        if (ward) {
            setState({
                ...state,
                room: {
                    ...state.room,
                    wardId: ward.id
                }
            });
        }
    }
    const updateRoomType = (type) => {
        if (roomTypes.includes(type)) {
            setState({
                ...state,
                room: {
                    ...state.room,
                    type: type
                }
            });
        }else{
            setState({
                ...state,
                room: {
                    ...state.room,
                    type: null
                }
            });
        }
    }
    const roomValid = () => {
        const validationErrors = [];
        if (state.room.wardId == null) {
            validationErrors.push(`Ward is not valid`);
        }
        if (state.room.type == null) {
            validationErrors.push(`Type is not valid`);
        }
        if (state.room.rate <= 0) {
            validationErrors.push(`Rate must be positive`);
        }
        if (state.room.currentBedCapacity <= 0) {
            validationErrors.push(`Current Bed Capacity must be positive`);
        }
        if (state.room.maxBedCapacity <= 0) {
            validationErrors.push(`Max Bed Capacity must be positive`);
        }

        return validationErrors;
    }
    const createRoom = async () => {
        const response = await getDataFromServer(ROOM_API + `${existing_room ? `/?id=${existing_room.id}` : ''}`,
            `${existing_room ? 'PUT' : 'POST'}`, state.room);
        if (response) {
            if (response.statusCode == 201 || response.statusCode == 204) {
                const room = response.record;
                window.location.href = '/Room';
            } else {
                setState({
                    ...state,
                    errors: [response.statusMessage]
                });
            }
        } else {
            setState({
                ...state,
                errors: ['Check your internet connection']
            });
        }
    }
    const createNewRoom = () => {
        const validationErrors = roomValid();
        if (validationErrors.length == 0) {
            setState({
                ...state,
                creating: true,
                validationErrors: []
            });
        } else {
            setState({
                ...state,
                validationErrors: validationErrors
            })
        }
    }
    useEffect(() => {
        if (state.wards == null) {
            getWards();
        }
    }, [state.wards]);
    useEffect(() => {
        if (state.creating) {
            createRoom();
        }
    }, [state.creating]);
    return (
        <>
            <div className="flex flex-align-center">
                <Link to={'/Room'}>
                    <svg viewBox="0 0 24 24" className='icon circle-bg' width='24px' height='24px'
                        style={{ marginRight: '5px' }}>
                        <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"
                            fill='currentColor'></path></svg>
                </Link>
                <div className='app-title flex flex-row flex-align-center flex-justify-center'>
                    <span id='app-title-text'>{`${existing_room ? 'Update' : 'Create'} Room`}</span>
                </div>
            </div>
            <div className="container m-2 flex flex-column" style={{
                gap: '5px'
            }}>
                <div className="form-group">
                    <label htmlFor="wardId">Ward Id</label>
                    {
                        state.wards && state.wards.length > 0 &&
                        <Select dataSource={getOptionsArray(state.wards, 'id')} name={'Ward'}
                            onChange={updateWard} defaultValue={existing_room ?
                                state.wards.filter((ward) => {
                                    return ward.id == existing_room.wardId
                                })[0].id : null} />
                    }
                </div>
                <div className="form-group">
                    <label htmlFor="type">Type</label>
                    <Select dataSource={roomTypes} name={'Type'}
                            onChange={updateRoomType} defaultValue={existing_room ? existing_room.type : null} />
                </div>
                <div className="form-group">
                    <label htmlFor="roomSharedCapacity">Rate</label>
                    <input className="form-control" value={state.room.rate} type={'number'}
                        onChange={(event) => setState({
                            ...state,
                            room: {
                                ...state.room,
                                rate: Number(event.target.value)
                            }
                        })}></input>
                </div>
                <div className="form-group">
                    <label htmlFor="roomGeneralCapacity">Current Bed Capacity</label>
                    <input className="form-control" value={state.room.currentBedCapacity} type={'number'}
                        onChange={(event) => setState({
                            ...state,
                            room: {
                                ...state.room,
                                currentBedCapacity: Number(event.target.value)
                            }
                        })}></input>
                </div>
                <div className="form-group">
                    <label htmlFor="roomGeneralCapacity">Max Bed Capacity</label>
                    <input className="form-control" value={state.room.maxBedCapacity} type={'number'}
                        onChange={(event) => setState({
                            ...state,
                            room: {
                                ...state.room,
                                maxBedCapacity: Number(event.target.value)
                            }
                        })}></input>
                </div>
                <button className="btn btn-primary" onClick={createNewRoom} disabled={state.creating}>
                    {`${existing_room ? 'Update' : 'Create'}`}
                </button>
                {
                    state.creating &&
                    <div className="container flex flex-align-center" style={{
                        gap: '10px'
                    }}>
                        <em>{`${existing_room ? 'Update' : 'Create'} Room`} room...</em>
                        <Loading />
                    </div>
                }
            </div>
            {
                state.validationErrors.length > 0 ?
                    <div className="container">
                        {
                            state.validationErrors.map((error, index) => (
                                <div key={index} className="text-danger">{error}</div>
                            ))
                        }
                    </div>
                    : state.errors.length > 0 ?
                        <div className="container">
                            {
                                state.errors.map((error, index) => (
                                    <div key={index} className="text-danger">{error}</div>
                                ))
                            }
                        </div>
                        : state.messages.length > 0 ?
                            <div className="container">
                                {
                                    state.messages.map((msg, index) => (
                                        <div key={index} className="">{msg}</div>
                                    ))
                                }
                            </div>
                            : null
            }
        </>
    );
}

export default CreateEntity;