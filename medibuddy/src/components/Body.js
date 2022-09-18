import React, { useState, useEffect, useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AppContext } from './App';
import Dashboard from './Dashboard/Dashboard';
import LeftNavigation from './LeftNavigation';
import OPDPatient from './OPDPatient/OPDPatient';
import Patient from './Patient/Patient';
import Doctor from './Doctor/Doctor';
import Nurse from './Nurse/Nurse';
import OPDTest from './OPDTest/OPDTest';
import Room from './Room/Room';
import CreateEntity from './Ward/CreateEntity';
import CreateRoom from './Room/CreateEntity';
import Ward from './Ward/Ward';
import Test from './Test/Test';
import Medicine from './Medicine/Medicine';
import OPDMedicine from './OPDMedicine/OPDMedicine';
import Department from './Department/Department';
import OPDBilling from './OPDBilling/OPDBilling';

const Body = () => {
    const appContext = useContext(AppContext);
    const [state, setState] = useState({
        navigationVisible: appContext.navigationVisible
    });
    useEffect(() => {
        if (state.navigationVisible != appContext.navigationVisible) {
            setState({
                navigationVisible: appContext.navigationVisible
            });
        }
    });
    return (
        <div className='body flex' id='body' style={!state.navigationVisible ? {
            paddingLeft: '10px',
            paddingRight: '10px'
        } : null}>
            {
                state.navigationVisible
                    ?
                    <LeftNavigation />
                    :
                    null
            }
            <div className='flex flex-column flex-align-start' style={{
                gap: '20px'
            }}>
                <Routes>
                    
                    <Route path='/Medicine' element={<Medicine />} />
                    <Route path='/OPDMedicine' element={<OPDMedicine />} />
                    <Route path='/Test' element={<Test />} />
                    <Route path='/Patient' element={<Patient />} />
                    <Route path='/Doctor' element={<Doctor/>} />
                    <Route path='/OPDTest' element={<OPDTest/>} />
                    <Route path='/Nurse' element={<Nurse/>} />
                    <Route path='/Department' element={<Department />} />
                    <Route path='/Ward' element={<Ward />} />
                    <Route path='/Room' element={<Room />} />
                    <Route path='/OPDPatient' element={<OPDPatient />} />
                    <Route path='OPDBilling' element={<OPDBilling />} />
                    <Route path='/' element={<Dashboard />} />
                    <Route path='/Dashboard' element={<Dashboard />} />
                    <Route path="/Ward/Create" element={<CreateEntity />} />
                    <Route path="/Ward/Edit/:id" element={<CreateEntity editing={true}/>} />
                    <Route path="/Room/Create" element={<CreateRoom />} />
                    <Route path="/Room/Edit/:id" element={<CreateRoom editing={true}/>} />
                </Routes>
            </div>
        </div>
    );
}
export default Body;