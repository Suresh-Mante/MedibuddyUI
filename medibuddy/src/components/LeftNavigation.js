import React, { useState } from 'react';
import { Link } from 'react-router-dom';

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
                        <svg viewBox="0 0 24 24" className='icon' width='24px' height='24px'
                            style={{ marginRight: '5px' }}>
                            <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"
                                fill='currentColor'></path></svg>
                        {state.isWidthFull ? 'Dashboard' : null}
                    </li>
                </Link>
                {/* Patient */}
                <Link to='/Patient' className='non-decor-link' id='home-link'
                    onClick={() => updateActiveTab('/Patient')}>
                    <li className={`one-line-text  flex ${state.activeTab == '/Patient' ?
                        'active' : ''}`}>
                        <svg viewBox="0 0 24 24" className='icon' width='24px' height='24px'
                            style={{ marginRight: '5px' }}>
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                                fill='currentColor'></path></svg>
                        {state.isWidthFull ? 'Patient' : null}
                    </li>
                </Link>
                {/* OPDBilling */}
                <Link to='/OPDBilling' className='non-decor-link' id='home-link'
                    onClick={() => updateActiveTab('/OPDBilling')}>
                    <li className={`one-line-text  flex ${state.activeTab == '/OPDBilling' ?
                        'active' : ''}`}>
                        <svg viewBox="0 0 24 24" className='icon' width='24px' height='24px'
                            style={{ marginRight: '5px' }}>
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                                fill='currentColor'></path></svg>
                        {state.isWidthFull ? 'OPDBilling' : null}
                    </li>
                </Link>
                {/* Doctor */}
                <Link to='/Doctor' className='non-decor-link' id='home-link'
                    onClick={() => updateActiveTab('/Doctor')}>
                    <li className={`one-line-text  flex ${state.activeTab == '/Doctor' ?
                        'active' : ''}`}>
                        <svg viewBox="0 0 24 24" className='icon' width='24px' height='24px'
                            style={{ marginRight: '5px' }}>
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                                fill='currentColor'></path></svg>
                        {state.isWidthFull ? 'Doctor' : null}
                    </li>
                </Link>
                {/* Ward */}
                <Link to='/Ward' className='non-decor-link' id='home-link'
                    onClick={() => updateActiveTab('/Ward')}>
                    <li className={`one-line-text  flex ${state.activeTab == '/Ward' ?
                        'active' : ''}`}>
                        <svg viewBox="0 0 24 24" className='icon' width='24px' height='24px'
                            style={{ marginRight: '5px' }}>
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                                fill='currentColor'></path></svg>
                        {state.isWidthFull ? 'Ward' : null}
                    </li>
                </Link>
                {/* Room */}
                <Link to='/Room' className='non-decor-link' id='home-link'
                    onClick={() => updateActiveTab('/Room')}>
                    <li className={`one-line-text  flex ${state.activeTab == '/Room' ?
                        'active' : ''}`}>
                        <svg viewBox="0 0 24 24" className='icon' width='24px' height='24px'
                            style={{ marginRight: '5px' }}>
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                                fill='currentColor'></path></svg>
                        {state.isWidthFull ? 'Room' : null}
                    </li>
                </Link>
                {/* OPDPatient */}
                <Link to='/OPDPatient' className='non-decor-link' id='home-link'
                    onClick={() => updateActiveTab('/OPDPatient')}>
                    <li className={`one-line-text  flex ${state.activeTab == '/OPDPatient' ?
                        'active' : ''}`}>
                        <svg viewBox="0 0 24 24" className='icon' width='24px' height='24px'
                            style={{ marginRight: '5px' }}>
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                                fill='currentColor'></path></svg>
                        {state.isWidthFull ? 'OPDPatient' : null}
                    </li>
                </Link>
                {/* Nurse */}
                <Link to='/Nurse' className='non-decor-link' id='home-link'
                    onClick={() => updateActiveTab('/Nurse')}>
                    <li className={`one-line-text  flex ${state.activeTab == '/Nurse' ?
                        'active' : ''}`}>
                        <svg viewBox="0 0 24 24" className='icon' width='24px' height='24px'
                            style={{ marginRight: '5px' }}>
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                                fill='currentColor'></path></svg>
                        {state.isWidthFull ? 'Nurse' : null}
                    </li>
                </Link>
                {/* OPDBilling */}
                <Link to='/OPDBilling' className='non-decor-link' id='home-link'
                    onClick={() => updateActiveTab('/OPDBilling')}>
                    <li className={`one-line-text  flex ${state.activeTab == '/OPDBilling' ?
                        'active' : ''}`}>
                        <svg viewBox="0 0 24 24" className='icon' width='24px' height='24px'
                            style={{ marginRight: '5px' }}>
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                                fill='currentColor'></path></svg>
                        {state.isWidthFull ? 'OPDBilling' : null}
                    </li>
                </Link>
                {/* OPDTest */}
                <Link to='/OPDTest' className='non-decor-link' id='home-link'
                    onClick={() => updateActiveTab('/OPDTest')}>
                    <li className={`one-line-text  flex ${state.activeTab == '/OPDTest' ?
                        'active' : ''}`}>
                        <svg viewBox="0 0 24 24" className='icon' width='24px' height='24px'
                            style={{ marginRight: '5px' }}>
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                                fill='currentColor'></path></svg>
                        {state.isWidthFull ? 'OPDTest' : null}
                    </li>
                </Link>
                {/*Test*/}
                <Link to='/Test' className='non-decor-link' id='home-link'
                    onClick={() => updateActiveTab('/Test')}>
                    <li className={`one-line-text  flex ${state.activeTab == '/Test' ?
                        'active' : ''}`}>
                        <svg viewBox="0 0 24 24" className='icon' width='24px' height='24px'
                            style={{ marginRight: '5px' }}>
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                                fill='currentColor'></path></svg>
                        {state.isWidthFull ? 'Test' : null}
                    </li>
                </Link>
                {/*Medicine*/}
                <Link to='/Medicine' className='non-decor-link' id='home-link'
                    onClick={() => updateActiveTab('/Medicine')}>
                    <li className={`one-line-text  flex ${state.activeTab == '/Medicine' ?
                        'active' : ''}`}>
                        <svg viewBox="0 0 24 24" className='icon' width='24px' height='24px'
                            style={{ marginRight: '5px' }}>
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                                fill='currentColor'></path></svg>
                        {state.isWidthFull ? 'Medicine' : null}
                    </li>
                </Link>
                {/*OPDMedicine*/}
                <Link to='/OPDMedicine' className='non-decor-link' id='home-link'
                    onClick={() => updateActiveTab('/OPDMedicine')}>
                    <li className={`one-line-text  flex ${state.activeTab == '/OPDMedicine' ?
                        'active' : ''}`}>
                        <svg viewBox="0 0 24 24" className='icon' width='24px' height='24px'
                            style={{ marginRight: '5px' }}>
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                                fill='currentColor'></path></svg>
                        {state.isWidthFull ? 'OPDMedicine' : null}
                    </li>
                </Link>
            </ul>
        </div>
    );
}
export default Menu;