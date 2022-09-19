import React, { useContext } from 'react';
import { AppContext} from '../App'
import { APP_TITLE } from '../Env';
import AppTitle from './AppTitle';

const Header = () => {

    const appContext = useContext(AppContext);
    
    return (
        <div className='header flex flex-row flex-justify-start flex-align-center'
            id='header'>
            <span className='icon circle-bg' id='toggle-left-navigation'
                style={{ marginLeft: '10px', minWidth: '26px', minHeight: '26px' }}
                onClick={appContext.toggleLeftNavigationVisibility}>
                <svg viewBox="0 0 24 24">
                    <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" fill="currentColor">
                    </path>
                </svg>
            </span>
            <AppTitle title={APP_TITLE} to={'/'}/>
        </div>
    );
}

export default Header;