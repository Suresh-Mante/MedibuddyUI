import React from 'react';
import { Link } from 'react-router-dom';

const AppTitle = (props) => {
  return (
    <Link to={props.to} className='non-decor-link'>
      <div className='app-title flex flex-row flex-align-center flex-justify-center'>
        <span id='app-title-text'>{props.title}</span>
      </div>
    </Link>
  );
}

export default AppTitle;

