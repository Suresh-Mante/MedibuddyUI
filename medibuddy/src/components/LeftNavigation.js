import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import patientLogo from '../images/patient.png';
import doctorLogo from '../images/doctor.png';
import nurseLogo from '../images/nurse.png';
import departmentLogo from '../images/department.png';
import wardLogo from '../images/ward.png';
import roomLogo from '../images/room.png';
import testLogo from '../images/test.png';
import medicineLogo from '../images/medicine.png';
import billingLogo from '../images/billing.png';
import dashboardLogo from '../images/dashboard.png';

const Menu = () => {

    const [state, setState] = useState({
        isWidthFull: true,
        activeTab: '/Dashboard'
    });

    const AnimateLeftNavigationDrawer = (initialWidth, finalWidth) => {
        let leftNavigation = document.getElementById('left-navigation');
        leftNavigation.animate([
            { minWidth: initialWidth },
            { minWidth: finalWidth }
        ], {
            duration: 200,
            easing: 'ease-out'
        });
        leftNavigation.style.minWidth = finalWidth;
    }

    const updateWidth = () => {
        if (state.isWidthFull) {
            AnimateLeftNavigationDrawer('200px', '80px');
        } else {
            AnimateLeftNavigationDrawer('80px', '200px');
        }
        setState({
            ...state,
            isWidthFull: !state.isWidthFull
        });
    }

    const updateActiveTab = (activeTab) => {
        setState({
            ...state,
            activeTab: activeTab
        })
    }

    return (
        <div className='left-navigation pos-relative' id='left-navigation'>
            <span className='icon small circle-bg flex flex-align-center flex-justify-center'
                onClick={updateWidth} style={{ marginLeft: 'auto' }} id='left-navigation-width-toggler'
                title={state.isWidthFull ? 'Minimize menu' : 'Maximize menu'}>
                {
                    state.isWidthFull
                        ?
                        <svg viewBox="0 0 24 24" width='24px' height='24px'>
                            <path d="m14 7-5 5 5 5V7z">
                            </path>
                        </svg>
                        :
                        <svg viewBox="0 0 24 24" width='24px' height='24px'>
                            <path d="m10 17 5-5-5-5v10z">
                            </path>
                        </svg>
                }
            </span>
            <ul className='left-navigation-menu'>
                {/* Dashboard */}
                <Link to='/Dashboard' className='non-decor-link' id='home-link'
                    onClick={() => updateActiveTab('/Dashboard')}>
                    <li className={`one-line-text  flex ${state.activeTab == '/Dashboard' ?
                        'active' : ''}`}>
                        <img className='icon' src={dashboardLogo} style={{ marginRight: '5px' }}></img>
                        {state.isWidthFull ? 'Dashboard' : null}
                    </li>
                </Link>
                {/* Patient */}
                <Link to='/Patient' className='non-decor-link' id='home-link'
                    onClick={() => updateActiveTab('/Patient')}>
                    <li className={`one-line-text  flex ${state.activeTab == '/Patient' ?
                        'active' : ''}`}>
                        <img className='icon' src={patientLogo} style={{ marginRight: '5px' }}></img>
                        {state.isWidthFull ? 'Patient' : null}
                    </li>
                </Link>
                {/* Department */}
                <Link to='/Department' className='non-decor-link' id='home-link'
                    onClick={() => updateActiveTab('/Department')}>
                    <li className={`one-line-text  flex ${state.activeTab == '/Department' ?
                        'active' : ''}`}>
                        <img className='icon' src={departmentLogo} style={{ marginRight: '5px' }}></img>
                        {state.isWidthFull ? 'Department' : null}
                    </li>
                </Link>
                {/* Doctor */}
                <Link to='/Doctor' className='non-decor-link' id='home-link'
                    onClick={() => updateActiveTab('/Doctor')}>
                    <li className={`one-line-text  flex ${state.activeTab == '/Doctor' ?
                        'active' : ''}`}>
                        <img className='icon' src={doctorLogo} style={{ marginRight: '5px' }}></img>
                        {state.isWidthFull ? 'Doctor' : null}
                    </li>
                </Link>
                {/* Ward */}
                <Link to='/Ward' className='non-decor-link' id='home-link'
                    onClick={() => updateActiveTab('/Ward')}>
                    <li className={`one-line-text  flex ${state.activeTab == '/Ward' ?
                        'active' : ''}`}>
                        <img className='icon' src={wardLogo} style={{ marginRight: '5px' }}></img>
                        {state.isWidthFull ? 'Ward' : null}
                    </li>
                </Link>
                {/* Room */}
                <Link to='/Room' className='non-decor-link' id='home-link'
                    onClick={() => updateActiveTab('/Room')}>
                    <li className={`one-line-text  flex ${state.activeTab == '/Room' ?
                        'active' : ''}`}>
                        <img className='icon' src={roomLogo} style={{ marginRight: '5px' }}></img>
                        {state.isWidthFull ? 'Room' : null}
                    </li>
                </Link>
                {/* OPDPatient */}
                <Link to='/OPDPatient' className='non-decor-link' id='home-link'
                    onClick={() => updateActiveTab('/OPDPatient')}>
                    <li className={`one-line-text  flex ${state.activeTab == '/OPDPatient' ?
                        'active' : ''}`}>
                        <img className='icon' src={patientLogo} style={{ marginRight: '5px' }}></img>
                        {state.isWidthFull ? 'OPDPatient' : null}
                    </li>
                </Link>
                {/* Nurse */}
                <Link to='/Nurse' className='non-decor-link' id='home-link'
                    onClick={() => updateActiveTab('/Nurse')}>
                    <li className={`one-line-text  flex ${state.activeTab == '/Nurse' ?
                        'active' : ''}`}>
                        <img className='icon' src={nurseLogo} style={{ marginRight: '5px' }}></img>
                        {state.isWidthFull ? 'Nurse' : null}
                    </li>
                </Link>

                {/* OPDBilling */}
                <Link to='/OPDBilling' className='non-decor-link' id='home-link'
                    onClick={() => updateActiveTab('/OPDBilling')}>
                    <li className={`one-line-text  flex ${state.activeTab == '/OPDBilling' ?
                        'active' : ''}`}>
                        <img className='icon' src={billingLogo} style={{ marginRight: '5px' }}></img>
                        {state.isWidthFull ? 'OPDBilling' : null}
                    </li>
                </Link>
                {/* OPDTest */}
                <Link to='/OPDTest' className='non-decor-link' id='home-link'
                    onClick={() => updateActiveTab('/OPDTest')}>
                    <li className={`one-line-text  flex ${state.activeTab == '/OPDTest' ?
                        'active' : ''}`}>
                        <img className='icon' src={testLogo} style={{ marginRight: '5px' }}></img>
                        {state.isWidthFull ? 'OPDTest' : null}
                    </li>
                </Link>
                {/*Test*/}
                <Link to='/Test' className='non-decor-link' id='home-link'
                    onClick={() => updateActiveTab('/Test')}>
                    <li className={`one-line-text  flex ${state.activeTab == '/Test' ?
                        'active' : ''}`}>
                        <img className='icon' src={testLogo} style={{ marginRight: '5px' }}></img>
                        {state.isWidthFull ? 'Test' : null}
                    </li>
                </Link>
                {/*Medicine*/}
                <Link to='/Medicine' className='non-decor-link' id='home-link'
                    onClick={() => updateActiveTab('/Medicine')}>
                    <li className={`one-line-text  flex ${state.activeTab == '/Medicine' ?
                        'active' : ''}`}>
                        <img className='icon' src={medicineLogo} style={{ marginRight: '5px' }}></img>
                        {state.isWidthFull ? 'Medicine' : null}
                    </li>
                </Link>
                {/*OPDMedicine*/}
                <Link to='/OPDMedicine' className='non-decor-link' id='home-link'
                    onClick={() => updateActiveTab('/OPDMedicine')}>
                    <li className={`one-line-text  flex ${state.activeTab == '/OPDMedicine' ?
                        'active' : ''}`}>
                        <img className='icon' src={medicineLogo} style={{ marginRight: '5px' }}></img>
                        {state.isWidthFull ? 'OPDMedicine' : null}
                    </li>
                </Link>
            </ul>
        </div>
    );
}
export default Menu;