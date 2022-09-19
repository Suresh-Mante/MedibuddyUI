import React from "react";
import { Link } from "react-router-dom";
import Loading from '../Shared/Loading';

const DashboardItem = (props) => {
    return (
        <Link to={props.redirectTo} className='non-decor-link'>
            <div className="item flex flex-row" style={{ gap: '40px' }}>
                <div className="flex flex-column" style={{ gap: '10px' }}>
                    <span className="count">{props.item ? props.item.length : <Loading params={{
                        color:'white'
                    }}/>}</span>
                    <div className="title" style={{
                        marginTop: 'auto'
                    }}>{props.title}</div>
                </div>
                <img src={props.image} style={{
                    width: '100px',
                    height: '100px',
                    marginLeft: 'auto'
                }}></img>
            </div>
        </Link>
    );
}

export default DashboardItem;