import React, { useState, useEffect, useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AppContext } from './App';
import Dashboard from './Dashboard/Dashboard';
import LeftNavigation from './LeftNavigation';
import OPDPatient from './OPDPatient/OPDPatient';
import Patient from './Patient/Patient';
import CreateEntityDoctor from './Doctor/CreateEntityDoctor';
import Doctor from './Doctor/Doctor';
import CreateEntityNurse from './Nurse/CreateEntityNurse';
import Nurse from './Nurse/Nurse';
import OPDTest from './OPDTest/OPDTest';
import Room from './Room/Room';
import CreateEntity from './Ward/CreateEntity';
import CreateRoom from './Room/CreateEntity';
import CreateOPDPatient from './OPDPatient/CreateEntity';
import CreateIPDPatient from './IPDPatient/CreateEntity';
import Ward from './Ward/Ward';
import Test from './Test/Test';
import Medicine from './Medicine/Medicine';
import OPDMedicine from './OPDMedicine/OPDMedicine';
import Department from './Department/Department';
import OPDBilling from './OPDBilling/OPDBilling';
import CreateEntityTest from './Test/CreateEntityTest';
import CreateEntityPatient from './Patient/CreateEntityPatient';
import CreateEntityDepartment from './Department/CreateEntityDepartment';
import CreateEntityOPDBilling from './OPDBilling/CreateEntityOPDBilling';
import CreateEntityMedicine from './Medicine/CreateEntityMedicine';
import Discharge from './OPDPatient/Discharge';
import IPDDischarge from './IPDPatient/Discharge';
import CreateEntityOPDTest from './OPDTest/CreateEntityOPDTest';
import CreateEntityOPDMedicine from './OPDMedicine/CreateEntityOPDMedicine';
import IPDPatient from './IPDPatient/IPDPatient';

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
            <div className='body-right flex flex-column flex-align-start' style={{
                gap: '20px',
            }}>
                <Routes>

                    <Route path='/Medicine' element={<Medicine />} />
                    <Route path='/OPDMedicine' element={<OPDMedicine />} />
                    <Route path='/Test' element={<Test />} />
                    <Route path="/Test/Create" element={<CreateEntityTest />} />
                    <Route path="/Test/Edit/:id" element={<CreateEntityTest editing={true} />} />
                    <Route path="/Medicine/Create" element={<CreateEntityMedicine />} />
                    <Route path="/Medicine/Edit/:id" element={<CreateEntityMedicine editing={true} />} />
                    <Route path='/Patient' element={<Patient />} />
                    <Route path='/Doctor' element={<Doctor />} />
                    <Route path='/OPDTest' element={<OPDTest />} />
                    <Route path='/Nurse' element={<Nurse />} />
                    <Route path='/Department' element={<Department />} />
                    <Route path='/Ward' element={<Ward />} />
                    <Route path='/Room' element={<Room />} />
                    <Route path='/OPDPatient' element={<OPDPatient />} />
                    <Route path='OPDBilling' element={<OPDBilling />} />
                    <Route path='/' element={<Dashboard />} />
                    <Route path='/Dashboard' element={<Dashboard />} />
                    <Route path="/Ward/Create" element={<CreateEntity />} />
                    <Route path="/Ward/Edit/:id" element={<CreateEntity editing={true} />} />
                    <Route path="/Patient/Create" element={<CreateEntityPatient />} />
                    <Route path="/Patient/Edit/:id" element={<CreateEntityPatient editing={true} />} />

                    <Route path="/Department/Create" element={<CreateEntityDepartment />} />
                    <Route path="/Department/Edit/:id" element={<CreateEntityDepartment editing={true} />} />
                    <Route path="/OPDBilling/Create" element={<CreateEntityOPDBilling />} />
                    <Route path="/OPDBilling/Edit/:id" element={<CreateEntityOPDBilling editing={true} />} />

                    <Route path="/OPDMedicine/Create" element={<CreateEntityOPDMedicine />} />


                    <Route path="/Doctor/Create" element={<CreateEntityDoctor />} />
                    <Route path="/Doctor/Edit/:id" element={<CreateEntityDoctor editing={true} />} />
                    <Route path="/Nurse/Create" element={<CreateEntityNurse />} />
                    <Route path="/Nurse/Edit/:id" element={<CreateEntityNurse editing={true} />} />

                    <Route path="/Room/Create" element={<CreateRoom />} />
                    <Route path="/Room/Edit/:id" element={<CreateRoom editing={true} />} />
                    <Route path="/OPDPatient/Create" element={<CreateOPDPatient />} />
                    <Route path="/OPDPatient/Edit/:id" element={<CreateOPDPatient editing={true} />} />
                    <Route path="/OPDPatient/Discharge/:id" element={<Discharge />} />

                    <Route path="/OPDTest/Create" element={<CreateEntityOPDTest />} />
                    <Route path="/OPDTest/Edit/:id" element={<CreateEntityOPDTest editing={true} />} />


                    <Route path="/IPDPatient" element={<IPDPatient />} />
                    <Route path="/IPDPatient/Create" element={<CreateIPDPatient />} />
                    <Route path="/IPDPatient/Edit/:id" element={<CreateIPDPatient editing={true} />} />
                    <Route path="/IPDPatient/Discharge/:id" element={<IPDDischarge />} />


                </Routes>
            </div>
        </div>
    );
}
export default Body;